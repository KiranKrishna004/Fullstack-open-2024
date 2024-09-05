import { createSlice } from '@reduxjs/toolkit'
import AnecdoteService from '../service/anecdotes'
import { setNotifications } from './notificationReducer'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },

    addVote(state, action) {
      return state.map((item) =>
        item.id !== action.payload.id ? item : action.payload
      )
    },

    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { addVote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await AnecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdotes = (content) => {
  return async (dispatch) => {
    const newAnecdote = await AnecdoteService.createAnecdote(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(setNotifications(`you created ${newAnecdote.content}`, 5))
  }
}

export const AddVotes = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await AnecdoteService.addVotetoAnecdote(anecdote)
    dispatch(addVote(updatedAnecdote))

    dispatch(setNotifications(`you voted ${updatedAnecdote.content}`, 5))
  }
}

export default anecdoteSlice.reducer
