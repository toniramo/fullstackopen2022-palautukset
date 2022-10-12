import { React, useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((b) => setBlogs(b));
  }, []);

  const handleLogin = async (event, username, password) => {
    event.preventDefault();
    const loggedUser = await loginService.login(username, password);
    setUser(loggedUser);
  };

  if (user === null) {
    return (
      <>
        <h2>Log in to application</h2>
        <LoginForm handleLogin={handleLogin} />
      </>
    );
  }
  return (
    <>
      <h2>Blogs</h2>
      <p>
        {`${user.name} `}
        logged in.
      </p>
      <Blogs blogs={blogs} />
    </>
  );
}

export default App;
