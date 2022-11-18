import React from 'react';
import { Box, StyledLink } from './StyledComponents';

const Blog = ({ blog }) => {

  const header = (
    <>
      <b>{blog.title}</b> by {blog.author}
    </>
  );

  return (
    <Box data-testid="blog-header-only">
      <StyledLink to={`/blogs/${blog.id}`}>{header}</StyledLink>
    </Box>
  );
};
export default Blog;
