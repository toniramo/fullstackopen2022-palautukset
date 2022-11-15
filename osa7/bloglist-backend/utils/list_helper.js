const _ = require('lodash');

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs
  .reduce((sum, blog) => sum + Number(blog.likes), 0);

const favoriteBlog = (blogs) => {
  if (!blogs.length) return null;
  const { title, author, likes } = blogs.reduce((blogWithMostLikes, blog) => {
    if (Number(blog.likes) > Number(blogWithMostLikes.likes)) {
      return blog;
    }
    return blogWithMostLikes;
  });
  return { title, author, likes };
};

const mostBlogs = (blogs) => {
  if (!blogs.length) return null;
  const count = _.countBy(blogs, ((blog) => blog.author));
  const result = Object.entries(count)
    .reduce((authorWithMost, author) => (author[1] > authorWithMost[1] ? author : authorWithMost));
  return { author: result[0], blogs: result[1] };
};

const mostLikes = (blogs) => {
  if (!blogs.length) return null;
  const groupedByAuthor = _.groupBy(blogs, ((blog) => blog.author));
  // eslint-disable-next-line max-len
  const mapped = _.mapValues(groupedByAuthor, (author) => _.sumBy(_.forIn(author, (o) => o), (o) => o.likes));
  // eslint-disable-next-line max-len
  const result = _.toPairs(mapped).reduce((pairWithMost, pair) => (pair[1] > pairWithMost[1] ? pair : pairWithMost));
  return { author: result[0], likes: result[1] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
