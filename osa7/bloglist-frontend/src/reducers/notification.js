import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    set(state, action) {
      return { ...action.payload };
    },
    clear() {
      return null;
    }
  }
});

let timeoutId;

export const setNotification = (content, type='info', timeout=5) => {
  return (dispatch) => {
    clearTimeout(timeoutId);
    dispatch(set({ content, type }));
    timeoutId = setTimeout(() => {
      dispatch(clear());
    }, timeout * 1000);
  };
};

export const { set, clear } = notificationSlice.actions;
export default notificationSlice.reducer;