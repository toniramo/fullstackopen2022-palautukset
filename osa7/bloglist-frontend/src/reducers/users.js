import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users';
import { handleError } from '../utils/errorHandler';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    }
  }
});

export const getAndSetUsers = () => {
  return async (dispatch) => {
    try {
      const users = await usersService.getAll();
      dispatch(setUsers(users));
      console.log(users);
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;