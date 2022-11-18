import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import InputField from './InputField';
import { login } from '../reducers/user';
import { Button } from './StyledComponents';

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
      <InputField
        label="username"
        type="text"
        value={username}
        name="username"
        onChange={setUsername}
      />
      <InputField
        label="password"
        type="password"
        value={password}
        name="password"
        onChange={setPassword}
      />
      <Button type="submit" id="login-button">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
