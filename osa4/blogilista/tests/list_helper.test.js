const listHelper = require('../utils/list_helper');
const blogs = require('./test_data/blogs');

test('dummy returns one', () => {
  const result = listHelper.dummy([]);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes([blogs[0]]);
    expect(result).toBe(7);
  });

  test('when list is empty, equals zero', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test('when list has many blogs, equals the total number of likes of those', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe('favorite blog', () => {
  test('when list has only one blog, equals that', () => {
    const result = listHelper.favoriteBlog([blogs[1]]);
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    });
  });

  test('when list has many blogs, equals the blog with the most likes', () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });

  test('when list is empty, equals null', () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toBe(null);
  });
});

describe('author with most blogs', () => {
  test('when list has only one blog, equals author of that', () => {
    const result = listHelper.mostBlogs([blogs[2]]);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    });
  });

  test('when list has many blogs, equals author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });

  test('when list is empty, is null', () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toBe(null);
  });
});
