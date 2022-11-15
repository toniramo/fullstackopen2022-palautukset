import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notification';
import blogReducer from './reducers/blog';
import userReducer from './reducers/user';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer
  }
});

export default store;

