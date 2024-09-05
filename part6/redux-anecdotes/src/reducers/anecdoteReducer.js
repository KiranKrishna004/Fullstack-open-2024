import { createSlice } from '@reduxjs/toolkit'
import AnecdoteService from '../service/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },

    addVote(state, action) {
      const anecdote = state.find((item) => item.id === action.payload)
      const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
      return state.map((item) =>
        item.id !== action.payload ? item : newAnecdote
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

export default anecdoteSlice.reducer
