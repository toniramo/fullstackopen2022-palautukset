const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  if (['title', 'url'].some((field) => !request.body[field])) {
    return response.status(400).send({ error: 'missing required fields' });
  }

  const result = await blog.save();
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
