import { React, useState } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = (event) => {
    event.preventDefault();
    handleLogin(username, password);
  };

  return (
    <form
      onSubmit={(event) => {
        login(event);
        setUsername('');
        setPassword('');
      }}
    >
      <Input
        label="username"
        type="text"
        value={username}
        name="username"
        onChange={setUsername}
      />
      <Input
        label="password"
        type="password"
        value={password}
        name="password"
        onChange={setPassword}
      />
      <button type="submit" id="login-button">Login</button>
    </form>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};
