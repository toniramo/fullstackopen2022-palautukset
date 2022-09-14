require('dotenv').config();

const { PORT, NODE_ENV, TEST_MONGODB_URI } = process.env;

const MONGODB_URI = NODE_ENV !== 'test'
  ? process.env.MONGODB_URI
  : TEST_MONGODB_URI;

module.exports = {
  PORT,
  MONGODB_URI,
  TEST_MONGODB_URI,
};
