/* eslint-disable react/prop-types */
import { React } from 'react';
// import PropTypes from 'prop-types';

function Blog({ blog }) {
  return <div>{`${blog.title} ${blog.author}`}</div>;
}

export default Blog;

Blog.propTypes = {
  // blog: PropTypes.string.isRequired,
};
