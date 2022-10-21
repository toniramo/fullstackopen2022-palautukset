import React from 'react';
import Blog from './Blog';

const Blogs = ({ blogs, handleLike, user, handleRemoveBlog }) => {
  return (
    <div id="blogs">
      {[...blogs]
        .sort((a,b) => b.likes-a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            user={user}
            handleRemoveBlog={handleRemoveBlog}
          />
        ))}
    </div>
  );
};

export default Blogs;
