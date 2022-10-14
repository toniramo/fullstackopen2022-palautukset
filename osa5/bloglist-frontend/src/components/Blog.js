import { React, useState } from 'react';

const Blog = ({ blog, handleLike }) => {
  const [fullView, setFullView] = useState(false);

  const toggleFullView = () => {
    setFullView(!fullView);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const header = <><b>{blog.title}</b> by {blog.author}</>;

  if (fullView) {
    return (
      <div style={blogStyle}>
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
      </div>
    );
  }
  return(
    <div style={blogStyle}>
      {header}
      <button onClick={toggleFullView}>View</button>
    </div>
  );
};
export default Blog;
