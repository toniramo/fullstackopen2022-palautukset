import { React, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { createNewBlog, initializeBlogs } from './reducers/blog';
import { retrieveStoredUser, logout } from './reducers/user';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(retrieveStoredUser());
  }, []);

  const blogFormRef = useRef();

  const handleCreateNew = (newBlog) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createNewBlog(newBlog));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (user === null) {
    return (
      <>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </>
    );
  }
  return (
    <>
      <h2>Blogs</h2>
      <Notification />
      <p>
        {`${user.name} `}
        logged in.
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </p>
      <Togglable buttonLabel={'New blog'} ref={blogFormRef}>
        <div>
          <h2>Create new</h2>
          <NewBlogForm handleCreateNew={handleCreateNew} />
        </div>
      </Togglable>
      <Blogs />
    </>
  );
};

export default App;
