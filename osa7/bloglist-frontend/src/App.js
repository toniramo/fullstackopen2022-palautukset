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
import { retrieveStoredUser } from './reducers/user';
import { getAndSetUsers } from './reducers/users';
import BlogView from './components/BlogView';
import NavigationMenu from './components/NavigationMenu';
import { Login, Page, setBodyStyle, Menu } from './components/StyledComponents';

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

  setBodyStyle();

  if (user === null) {
    return (
      <>
        <Menu>
          <b>Login to application.</b>
        </Menu>
        <Login>
          <Notification />
          <LoginForm />
        </Login>
      </>
    );
  }
  return (
    <>
      <NavigationMenu />
      <Page>
        <h1>Blogs</h1>
        <Notification />
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
      </Page>
    </>
  );
};

export default App;
