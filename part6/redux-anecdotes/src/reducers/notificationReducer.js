import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },

    resetNotification() {
      return null
    },
  },
})

export default notificationSlice.reducer
export const { setNotification, resetNotification } = notificationSlice.actions

export const setNotifications = (message, timer) => {
  return async (dispatch) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(resetNotification())
    }, timer * 1000)
  }
}
