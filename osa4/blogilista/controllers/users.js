const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body;

  if (password.length < 3) {
    return response.status(400).send({ error: 'password too short, must be at least 3 characters long' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    passwordHash,
    name,
  });

  const savedUser = await user.save();
  return response.status(201).json(savedUser);
});

module.exports = usersRouter;
