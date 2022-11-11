import { React, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { setNotification } from './reducers/notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    const storedUser = JSON.parse(window.localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      blogService.setToken(storedUser.token);
    }
  }, []);

  const handleError = (error) => {
    if (error.name === 'AxiosError') {
      dispatch(setNotification(error.response.data.error, 'error', 5));
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const loggedUser = await loginService.login(username, password);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
      window.localStorage.setItem('user', JSON.stringify(loggedUser));
    } catch (error) {
      handleError(error);
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
      const createdBlog = await blogService.createNew(newBlog);
      const updatedBlogs = blogs.concat(createdBlog);
      setBlogs(updatedBlogs);
      const { title, author } = newBlog;
      dispatch(setNotification(`A new blog ${title} ${author && `by ${author}`} added.`));
    } catch (error) {
      handleError(error);
    }
  };

  const handleLike = async (likedBlog) => {
    likedBlog.likes += 1;
    try {
      await blogService.update({ ...likedBlog, user: likedBlog.user.id });
      const updatedBlogs = blogs.map((blog) => {
        if (blog.id === likedBlog.id) {
          return likedBlog;
        }
        return blog;
      });
      setBlogs(updatedBlogs);
    } catch (error) {
      handleError(error);
    }
  };

  const handleRemoveBlog = async (blogToRemove) => {
    try {
      await blogService.remove(blogToRemove);
      const updatedBlogs = blogs.filter((blog) => blog.id !== blogToRemove.id);
      setBlogs(updatedBlogs);
    } catch (error) {
      handleError(error);
    }
  };

  if (user === null) {
    return (
      <>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
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
      <Blogs
        blogs={blogs}
        handleLike={handleLike}
        user={user}
        handleRemoveBlog={handleRemoveBlog}
      />
    </>
  );
};

export default App;
