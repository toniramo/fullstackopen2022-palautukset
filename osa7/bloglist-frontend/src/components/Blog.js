import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeBlog, removeBlog } from '../reducers/blog';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

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
    display: blog.user.username === user.username ? '' : 'none',
  };

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleRemove = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog));
    }
  };

  const header = (
    <>
      <b>{blog.title}</b> by {blog.author}
    </>
  );

  if (fullView) {
    return (
      <div style={blogStyle} data-testid="blog-all-info">
        <div>
          {header}
          <button onClick={toggleFullView}>Hide</button>
        </div>
        <div>url: {blog.url}</div>
        <div>
          likes: {blog.likes}
          <button onClick={handleLike}>Like</button>
        </div>
        <div>added by: {blog.user ? blog.user.name : null}</div>
        <div>
          <button style={removeButtonStyle} onClick={handleRemove}>
            Remove
          </button>
        </div>
      </div>
    );
  }
  return (
    <div style={blogStyle} data-testid="blog-header-only">
      {header}
      <button onClick={toggleFullView}>View</button>
    </div>
  );
};
export default Blog;
