import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.create.value
    event.target.create.value = ''
    dispatch(createAnecdote(content))
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
