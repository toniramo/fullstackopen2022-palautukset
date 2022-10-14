import React from 'react';
import Blog from './Blog';

const Blogs = ({ blogs, handleLike }) => {
  return (
    <div>
      {[...blogs]
        .sort((a,b) => b.likes-a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} handleLike={handleLike} />
        ))}
    </div>
  );
};

export default Blogs;
