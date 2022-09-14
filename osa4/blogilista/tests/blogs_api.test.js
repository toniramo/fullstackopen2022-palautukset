const { identity } = require('lodash');
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

afterAll(() => {
  mongoose.connection.close();
});
