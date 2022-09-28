const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');

afterAll(async () => {
  mongoose.connection.close();
});

const login = async (user) => {
  const { username, password } = user;
  return (await api
    .post('/api/login')
    .send({ username, password })).body.token;
};

describe('Blogs:', () => {
  const user = {
    username: 'blogitestaaja',
    name: 'Blogi Testaaja',
    password: 'salainensana',
  };

  beforeEach(async () => {
    await User.deleteMany({});
    const response = await api.post('/api/users').send(user);
    user.id = response.body.id;
    const blogs = helper.initialBlogs.map((b) => ({ ...b, user: user.id }));

    await Blog.deleteMany({});
    await Blog.insertMany(blogs);
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

  describe('when logged in', () => {
    let token = null;
    beforeEach(async () => {
      token = await login(user);
    });

    describe('adding a blog', () => {
      test('succeeds with a valid blog', async () => {
        await api
          .post('/api/blogs')
          .set('Authorization', `bearer ${token}`)
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
          .set('Authorization', `bearer ${token}`)
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
          .set('Authorization', `bearer ${token}`)
          .send({ author: 'Testaaja', title: 'Pieleen menevä testi', likes: 100 })
          .expect(400);

        const blogsAtTheEnd = await helper.blogsInDb();
        expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length);
      });

      test('fails if blog has no title', async () => {
        await api
          .post('/api/blogs')
          .set('Authorization', `bearer ${token}`)
          .send({ author: 'Testaaja', url: 'http://testi.osoite', likes: 100 })
          .expect(400);

        const blogsAtTheEnd = await helper.blogsInDb();
        expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length);
      });
    });

    describe('deleting a blog', () => {
      test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[0];

        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .set('Authorization', `bearer ${token}`)
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
          .set('Authorization', `bearer ${token}`)
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
          .set('Authorization', `bearer ${token}`)
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
  });

  describe('when not logged in', () => {
    describe('adding a blog', () => {
      test('fails with status code 401', async () => {
        await api
          .post('/api/blogs')
          .send(helper.additionalBlogs[0])
          .expect(401)
          .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
        expect(blogsAtEnd).toEqual(
          expect.not.arrayContaining([
            expect.objectContaining(helper.additionalBlogs[0]),
          ]),
        );
      });
    });

    describe('deleting a blog', () => {
      test('fails with status code 401', async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[0];

        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .expect(401);

        const blogsAtEnd = await helper.blogsInDb();

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

        expect(blogsAtEnd).toEqual(
          expect.arrayContaining([
            expect.objectContaining(blogToDelete),
          ]),
        );
      });
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
        .expect(400);

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
        .expect(400);

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
});

describe('Users:', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await User.insertMany(helper.initialUsers);
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
});
