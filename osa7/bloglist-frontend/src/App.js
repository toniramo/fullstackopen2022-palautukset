import { React, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Users from './components/Users';
import User from './components/User';
import { createNewBlog, initializeBlogs } from './reducers/blog';
import { retrieveStoredUser, logout } from './reducers/user';
import { getAndSetUsers } from './reducers/users';
import BlogView from './components/BlogView';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(retrieveStoredUser());
    dispatch(getAndSetUsers());
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
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogView />} />
        <Route path="/" element={
          <>
            <Togglable buttonLabel={'New blog'} ref={blogFormRef}>
              <div>
                <h2>Create new</h2>
                <NewBlogForm handleCreateNew={handleCreateNew} />
              </div>
            </Togglable>
            <Blogs />
          </>}
        />
      </Routes>

    </>
  );
};

export default App;
