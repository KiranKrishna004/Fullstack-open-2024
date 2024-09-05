import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  addAnecdoteNotification,
  resetNotification,
} from '../reducers/notificationReducer'

export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.create.value
    event.target.create.value = ''
    dispatch(createAnecdote(content))
    dispatch(addAnecdoteNotification(content))

    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  return (
    <>
      <h2>create new</h2>

      <form onSubmit={addAnecdote}>
        <div>
          <input name="create" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}
