import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import loginService from '../services/login';
import { handleError } from '../utils/errorHandler';

const userSlice = createSlice({
  name: 'user',
  initialState : null,
  reducers: {
    set(state, action) {
      return action.payload;
    },
    clear() {
      return null;
    }
  }
});

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(username, password);
      dispatch(set(user));
      window.localStorage.setItem('user', JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const retrieveStoredUser = () => {
  return (dispatch) => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    user && dispatch(set(user)) && blogService.setToken(user.token);
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(clear());
    window.localStorage.removeItem('user');
    blogService.setToken(null);
  };
};

export const { set, clear } = userSlice.actions;
export default userSlice.reducer;