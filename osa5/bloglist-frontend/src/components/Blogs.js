/* eslint-disable react/prop-types */
import React from 'react';
import Blog from './Blog';
// import PropTypes from 'prop-types';

function Blogs({ blogs }) {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default Blogs;

Blogs.propTypes = {
  // blogs: PropTypes.objectOf(PropTypes.object()).isRequired,
};
