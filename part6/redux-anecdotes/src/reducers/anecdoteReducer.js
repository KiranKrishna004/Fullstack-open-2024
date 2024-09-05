import { createSlice } from '@reduxjs/toolkit'
import AnecdoteService from '../service/anecdotes'
import {
  addAnecdoteNotification,
  resetNotification,
} from './notificationReducer'

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
    dispatch(addAnecdoteNotification(newAnecdote.content))

    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }
}

export const AddVotes = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await AnecdoteService.addVotetoAnecdote(anecdote)
    dispatch(addVote(updatedAnecdote))
    dispatch(addAnecdoteNotification(updatedAnecdote.content))

    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }
}

export default anecdoteSlice.reducer
