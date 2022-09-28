/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { user } = request;

  const blog = new Blog({ ...request.body, user: user._id });
  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();

  return response.status(201).json(result);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const { user } = request;

  const blogToDelete = await Blog.findById(request.params.id);
  if (!blogToDelete) {
    response.status(404).send({ error: 'nonexisting id' });
  }
  if (blogToDelete.user.toString() !== user.id.toString()) {
    response.status(401).send({ error: 'blog user does not match with current user' });
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request;

  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  return updatedBlog
    ? response.json(updatedBlog)
    : response.status(404).send({ error: 'nonexisting id' });
});

module.exports = blogsRouter;
