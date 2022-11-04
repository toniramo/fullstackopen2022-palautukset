import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
      set(state, action) {
        return action.payload
      },
      clear(state, action) {
        return ''
      }
    }
  })
  
  export const setNotification = (content, timeoutInSec) => {
    return dispatch => {
      dispatch(set(content))
      setTimeout(() => {
        console.log("clear")
        dispatch(clear())
      }, timeoutInSec * 1000)
    }
  }

  export const { set, clear } = notificationSlice.actions
  export default notificationSlice.reducer