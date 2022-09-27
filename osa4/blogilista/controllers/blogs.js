/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const user = await User.findOne({});
  const blog = new Blog({ ...request.body, user: user._id });
  const result = await blog.save();
  console.log('result :>> ', result);
  user.blogs = user.blogs.concat(result._id);
  await user.save();

  return response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
  const deletedBlog = (await Blog.findByIdAndDelete(request.params.id));
  return deletedBlog
    ? response.status(204).end()
    : response.status(404).send({ error: 'nonexisting id' });
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
