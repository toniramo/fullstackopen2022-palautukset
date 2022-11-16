import React from 'react';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    padding: 5,
  };

  const header = (
    <>
      <b>{blog.title}</b> by {blog.author}
    </>
  );

  return (
    <div style={blogStyle} data-testid="blog-header-only">
      <Link to={`/blogs/${blog.id}`}>{header}</Link>
    </div>
  );
};
export default Blog;
