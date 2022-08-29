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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
