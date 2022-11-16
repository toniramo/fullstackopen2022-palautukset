/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'blog must have a title'],
  },
  author: String,
  url: {
    type: String,
    required: [true, 'blog must have an url'],
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [
    {
      type: String,
      required: [true, 'comment should not be empty'],
    },
  ],
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.user = returnedObject.user ? returnedObject.user : null;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
