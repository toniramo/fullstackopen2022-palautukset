import { createSlice } from "@reduxjs/toolkit";

const initialNotificationState = { content: '', timeoutId: null }

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { content: '', timeoutId: null },
  reducers: {
      setContent(state, action) {
        return { ...state, content: action.payload }
      },
      setTimeoutId(state, action) {
        return { ...state, timeoutId: action.payload }
      },
      clear(state, action) {
        return initialNotificationState
      }
    }
  })
  
  export const setNotification = (content, timeoutInSec) => {
    return (dispatch, getState) => {
      const timeoutId = getState().notification.timeoutId
      timeoutId && clearTimeout(timeoutId)
      dispatch(setContent(content))
      const id = setTimeoutId(
        setTimeout(() => {
        dispatch(clear())
        }, timeoutInSec * 1000)
      ).payload
      dispatch(setTimeoutId(id))
    }
  }

  export const { setContent, setTimeoutId, clear } = notificationSlice.actions
  export default notificationSlice.reducer