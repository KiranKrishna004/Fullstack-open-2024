import { createSlice } from '@reduxjs/toolkit'

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

export default anecdoteSlice.reducer
