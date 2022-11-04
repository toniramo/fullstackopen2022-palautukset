import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Initial notification',
  reducers: {
    setNotification(state, action) {
        return action.payload
      }
    }
  })

  export const { setNotificaition } = notificationSlice.actions
  export default notificationSlice.reducer