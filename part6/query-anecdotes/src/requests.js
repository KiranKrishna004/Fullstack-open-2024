import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export const createAnecdote = async (content) => {
  const object = { content, votes: 0 }
  const res = await axios.post(baseUrl, object)
  return res.data
}

export const addVotes = async (anecdote) => {
  const res = await axios.put(`${baseUrl}/${anecdote.id}`, {
    ...anecdote,
    votes: anecdote.votes + 1,
  })
  return res.data
}
