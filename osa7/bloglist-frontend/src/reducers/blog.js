import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { handleError } from '../utils/errorHandler';
import { setNotification } from './notification';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    append(state, action) {
      return [ ...state, action.payload ];
    },
    update(state, action) {
      return state.map(blog => {
        return blog.id === action.payload.id
          ? action.payload
          : blog;
      });
    },
    remove(state, action) {
      return state.filter(blog => {
        return blog.id !== action.payload.id;
      });
    }
  }
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createNewBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.createNew(blog);
      dispatch(append(newBlog));
      const { title, author } = newBlog;
      dispatch(setNotification(`A new blog ${title} ${author && `by ${author}`} added.`));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update({ ...blog, likes: blog.likes + 1 });
      dispatch(update(updatedBlog));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog);
      dispatch(remove(blog));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const { setBlogs, append, update, remove } = blogsSlice.actions;
export default blogsSlice.reducer;