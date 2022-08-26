const morgan = require('morgan');

morgan.token('req-body', (req) => (
  ['POST', 'PUT'].includes(req.method)
    ? JSON.stringify(req.body)
    : null));

const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :req-body');

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

module.exports = {
  requestLogger,
  unknownEndpoint,
};
