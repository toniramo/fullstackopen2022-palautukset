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

describe('when there are initially some blogs saved', () => {
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

  test('returned blogs have an id', async () => {
    const blogs = (await api.get('/api/blogs')).body;
    blogs.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe('adding a blog', () => {
  test('succeeds with a valid blog', async () => {
    await api
      .post('/api/blogs')
      .send(helper.additionalBlogs[0])
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    expect(blogsAtEnd).toEqual(
      expect.arrayContaining([
        expect.objectContaining(helper.additionalBlogs[0]),
      ]),
    );
  });

  test('succeeds even if blog has no likes', async () => {
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

  test('fails if blog has no url', async () => {
    await api
      .post('/api/blogs')
      .send({ author: 'Testaaja', title: 'Pieleen menevä testi', likes: 100 })
      .expect(400);

    const blogsAtTheEnd = await helper.blogsInDb();
    expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('fails if blog has no title', async () => {
    await api
      .post('/api/blogs')
      .send({ author: 'Testaaja', url: 'http://testi.osoite', likes: 100 })
      .expect(400);

    const blogsAtTheEnd = await helper.blogsInDb();
    expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    expect(blogsAtEnd).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining(blogToDelete),
      ]),
    );
  });

  test('fails with status code 404 if id is invalid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete('/api/blogs/invalidId123')
      .expect(404);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    expect(blogsAtEnd).toEqual(
      expect.arrayContaining([
        expect.objectContaining(blogToDelete),
      ]),
    );
  });

  test('fails with status code 404 if id is nonexisting', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete('/api/blogs/6324638e05458b4b5e12b996')
      .expect(404);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    expect(blogsAtEnd).toEqual(
      expect.arrayContaining([
        expect.objectContaining(blogToDelete),
      ]),
    );
  });
});

describe('updating blog', () => {
  test('succeeds with a valid id and number of likes', async () => {
    const blogToUpdate = (await helper.blogsInDb())[0];

    const updatedBlog = (await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 123 })
      .expect(200)
      .expect('Content-Type', /application\/json/))
      .body;

    expect(updatedBlog).toEqual({ ...blogToUpdate, likes: 123 });
  });

  test('fails with a valid id and invalid number of likes', async () => {
    const blogToUpdate = (await helper.blogsInDb())[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 'abc' })
      .expect(500);

    const blogAtEnd = await helper.getBlogById(blogToUpdate.id);
    expect(blogAtEnd).toEqual(blogToUpdate);
  });

  test('fails with a nonexisting id', async () => {
    const blogToUpdate = (await helper.blogsInDb())[0];

    await api
      .put('/api/blogs/6324638e05458b4b5e12b996')
      .send({ likes: 432 })
      .expect(404);

    const blogAtEnd = await helper.getBlogById(blogToUpdate.id);
    expect(blogAtEnd).toEqual(blogToUpdate);
  });

  test('fails with an invalid id', async () => {
    const blogToUpdate = (await helper.blogsInDb())[0];

    await api
      .put('/api/blogs/invalidId')
      .send({ likes: 1 })
      .expect(500);

    const blogAtEnd = await helper.getBlogById(blogToUpdate.id);
    expect(blogAtEnd).toEqual(blogToUpdate);
  });

  test('succeeds with a valid id and changed author, title, url and likes', async () => {
    const blogToUpdate = (await helper.blogsInDb())[0];
    const updatedFields = {
      author: 'Muutettu',
      title: 'Muutos',
      url: 'joku.muu',
      likes: 123,
    };

    const updatedBlog = (await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedFields)
      .expect(200)
      .expect('Content-Type', /application\/json/))
      .body;

    expect(updatedBlog).toEqual({ ...blogToUpdate, ...updatedFields });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
