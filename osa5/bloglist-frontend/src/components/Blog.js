import { React, useState } from 'react';

const Blog = ({ blog }) => {
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
  if (fullView) {
    return (
      <div style={blogStyle}>
        <div>
          <b>{blog.title}</b>
          <button onClick={toggleFullView}>Hide</button>
        </div>
        <div>url: {blog.url}</div>
        <div>likes: {blog.likes}</div>
        <div>author: {blog.author}</div>
      </div>
    );
  }
  return(
    <div style={blogStyle}>
      {`${blog.title} by ${blog.author}`}
      <button onClick={toggleFullView}>View</button>
    </div>
  );
};
export default Blog;
