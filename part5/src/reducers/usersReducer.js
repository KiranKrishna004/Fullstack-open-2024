import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const initialState = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export default usersSlice.reducer

export const { setUsers } = usersSlice.actions

export const userSetter = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()

    dispatch(setUsers(users))
  }
}
