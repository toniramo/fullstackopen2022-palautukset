const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');

const api = supertest(app);

const Blog = require('../models/Blog');
const helper = require('./test_helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('specific blogs are within returned blogs', async () => {
  const blogs = (await api.get('/api/blogs')).body;
  helper.initialBlogs.forEach((blog) => {
    expect(blogs).toEqual(
      expect.arrayContaining([
        expect.objectContaining(blog),
      ]),
    );
  });
});

test('specific blogs are not within returned blogs', async () => {
  const blogs = (await api.get('/api/blogs')).body;
  helper.additionalBlogs.forEach((blog) => {
    expect(blogs).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining(blog),
      ]),
    );
  });
});

test('returned blogs have id', async () => {
  const blogs = (await api.get('/api/blogs')).body;
  blogs.forEach((blog) => {
    expect(blog.id).toBeDefined();
  });
});

test('a valid blog can be added', async () => {
  await api
    .post('/api/blogs')
    .send(helper.additionalBlogs[0])
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtTheEnd = await helper.blogsInDb();

  expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length + 1);
  expect(blogsAtTheEnd).toEqual(
    expect.arrayContaining([
      expect.objectContaining(helper.additionalBlogs[0]),
    ]),
  );
});

test('a blog without likes can be added', async () => {
  const { likes, ...blogToBeAdded } = helper.additionalBlogs[1];
  const response = await api
    .post('/api/blogs')
    .send(blogToBeAdded)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtTheEnd = await helper.blogsInDb();

  expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length + 1);
  expect(response.body.likes).toBe(0);
});

test('a blog without url cannot be added', async () => {
  await api
    .post('/api/blogs')
    .send({ author: 'Testaaja', title: 'Pieleen menevä testi', likes: 100 })
    .expect(400);

  const blogsAtTheEnd = await helper.blogsInDb();
  expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length);
});

test('a blog wihtout title cannot be added', async () => {
  await api
    .post('/api/blogs')
    .send({ author: 'Testaaja', url: 'http://testi.osoite', likes: 100 })
    .expect(400);

  const blogsAtTheEnd = await helper.blogsInDb();
  expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
