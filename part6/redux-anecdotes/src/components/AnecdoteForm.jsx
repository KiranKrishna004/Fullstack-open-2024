import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  addAnecdoteNotification,
  resetNotification,
} from '../reducers/notificationReducer'
import AnecdoteService from '../service/anecdotes'

export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.create.value
    event.target.create.value = ''

    const response = await AnecdoteService.createAnecdote(content)
    dispatch(createAnecdote(response))
    dispatch(addAnecdoteNotification(response.content))

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
