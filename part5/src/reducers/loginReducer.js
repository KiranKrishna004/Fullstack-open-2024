import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { notificationSetter } from './notificationReducer'

const initialState = null

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCreds(state, action) {
      return action.payload
    },
    resetCreds() {
      return null
    },
  },
})

export default loginSlice.reducer
export const { setCreds, resetCreds } = loginSlice.actions

export const userCredSetter = (creds) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(creds)
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setCreds(user))
    } catch (e) {
      dispatch(notificationSetter('Wrong credentials'))
    }
  }
}

export const userCredResetter = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('user')
    blogService.setToken(null)
    dispatch(resetCreds())
  }
}

export const userCredGetter = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)

      dispatch(setCreds(user))
    }
  }
}
