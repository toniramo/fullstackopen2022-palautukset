import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from './Input';
import { login } from '../reducers/user';

const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login(username, password));
    setUsername(''),
    setPassword('');
  };

  return (
    <form
      onSubmit={handleLogin}
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
      <button type="submit" id="login-button">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
