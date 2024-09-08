import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
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

export const notificationSetter = (message) => {
  return async (dispatch) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }
}
