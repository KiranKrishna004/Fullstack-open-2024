import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import {
  resetNotification,
  voteAnecdoteNotification,
} from '../reducers/notificationReducer'

export const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes
      .filter((anecdote) => anecdote.content.includes(state.filter))
      .sort((a, b) => b.votes - a.votes)
  )
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))

    const anecdote = anecdotes.find((anecdote) => anecdote.id === id)
    dispatch(voteAnecdoteNotification(anecdote.content))

    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  ))
}
