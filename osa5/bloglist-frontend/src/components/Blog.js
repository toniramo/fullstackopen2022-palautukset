import { React, useState } from 'react';

const Blog = ({ blog, handleLike, user, handleRemoveBlog }) => {
  const [fullView, setFullView] = useState(false);

  const toggleFullView = () => {
    setFullView(!fullView);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    padding: 5,
  };

  const removeButtonStyle = {
    background: 'salmon',
    border: 'solid',
    borderWidth: 0.1,
    display : blog.user.username === user.username ? '' : 'none'
  };

  const removeBlog = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      handleRemoveBlog(blog);
    }
  };

  const header = <><b>{blog.title}</b> by {blog.author}</>;

  if (fullView) {
    return (
      <div style={blogStyle} data-testid="blog-full-info">
        <div>
          {header}
          <button onClick={toggleFullView}>Hide</button>
        </div>
        <div>url: {blog.url}</div>
        <div>
          likes: {blog.likes}
          <button onClick={() => handleLike(blog)}>Like</button>
        </div>
        <div>added by: { blog.user ? blog.user.name : null }</div>
        <div>
          <button style={removeButtonStyle} onClick={removeBlog}>Remove</button>
        </div>
      </div>
    );
  }
  return(
    <div style={blogStyle} data-testid="blog-header-only">
      {header}
      <button onClick={toggleFullView}>View</button>
    </div>
  );
};
export default Blog;
