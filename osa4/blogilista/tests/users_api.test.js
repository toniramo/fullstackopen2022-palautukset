const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');

const api = supertest(app);

const User = require('../models/User');
const helper = require('./test_helper');

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);
});

afterAll(() => {
  mongoose.connection.close();
});

describe('when there is initally users saved', () => {
  test('all users are returned', async () => {
    const response = await api.get('/api/users');
    expect(response.body).toHaveLength(helper.initialUsers.length);
  });

  test('users are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('a valid user can be created', async () => {
    const user = {
      username: 'newuser',
      password: 'validpassword',
      name: 'Name User',
    };

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toMatchObject({ username: user.username, name: user.name });

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1);
  });

  test('a user with too short username cannot be created', async () => {
    const user = {
      username: '12',
      password: 'validpassword',
      name: 'no name',
    };

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400);

    expect(response.body.error).toContain('username too short, must be at least 3 characters');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
  });

  test('a user with too short password cannot be created', async () => {
    const user = {
      username: 'validname',
      password: 'n',
      name: 'Test Name',
    };

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400);

    expect(response.body.error).toContain('password too short, must be at least 3 characters');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
  });

  test('a user with non-unique username cannot be created', async () => {
    const user = helper.initialUsers[0];

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400);

    expect(response.body.error).toContain('expected `username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
  });
});
