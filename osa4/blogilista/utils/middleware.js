const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const logger = require('./logger');

morgan.token('req-body', (req) => (
  ['POST', 'PUT'].includes(req.method)
    ? JSON.stringify(req.body)
    : null));

const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :req-body');

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  request.token = (authorization && authorization.toLowerCase().startsWith('bearer '))
    ? authorization.substring(7)
    : null;
  next();
};

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  request.user = await User.findById(decodedToken.id);
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error('error.message :>> ', error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  } if (error.name === 'JsonWebTokenError') {
    return response.status(400).send({ error: 'token missing or invalid' });
  }
  return next(error);
};

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler,
};
