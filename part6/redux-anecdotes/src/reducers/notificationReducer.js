import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    voteAnecdoteNotification(state, action) {
      return `you voted '${action.payload}'`
    },
    addAnecdoteNotification(state, action) {
      return `you create '${action.payload}'`
    },
    resetNotification() {
      return null
    },
  },
})

export default notificationSlice.reducer
export const {
  voteAnecdoteNotification,
  addAnecdoteNotification,
  resetNotification,
} = notificationSlice.actions
