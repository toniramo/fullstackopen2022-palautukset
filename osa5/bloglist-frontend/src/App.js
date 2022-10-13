import { React, useState, useEffect, useRef } from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  useEffect(() => {
    blogService.getAll().then((b) => setBlogs(b));
    const storedUser = JSON.parse(window.localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      blogService.setToken(storedUser.token);
    }
  }, []);

  const showNotification = (message, type) => {
    setNotification({
      message,
      type,
    });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 5000);
  };

  const handleLogin = async (username, password) => {
    try {
      const loggedUser = await loginService.login(username, password);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
      window.localStorage.setItem('user', JSON.stringify(loggedUser));
    } catch (error) {
      if (error.name === 'AxiosError') {
        showNotification(error.response.data.error, 'error');
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    blogService.setToken(null);
    window.localStorage.clear();
  };

  const blogFormRef = useRef();

  const handleCreateNew = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    try {
      const id = (await blogService.createNew(newBlog)).id;
      const updatedBlogs = blogs.concat({ ...newBlog, id });
      setBlogs(updatedBlogs);
      showNotification(`A new blog ${newBlog.title} by ${newBlog.author} added.`, 'info');
    } catch (error) {
      if (error.name === 'AxiosError') {
        showNotification(error.response.data.error, 'error');
      }
    }
  };

  if (user === null) {
    return (
      <>
        <h2>Log in to application</h2>
        <Notification message={notification.message} type={notification.type} />
        <LoginForm handleLogin={handleLogin} />
      </>
    );
  }
  return (
    <>
      <h2>Blogs</h2>
      <Notification message={notification.message} type={notification.type} />
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
      <Blogs blogs={blogs} />
    </>
  );
};

export default App;
