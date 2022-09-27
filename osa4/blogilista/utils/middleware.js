const morgan = require('morgan');
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
  unknownEndpoint,
  errorHandler,
};
