import { useDispatch } from 'react-redux'
import { createAnecdotes } from '../reducers/anecdoteReducer'

export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.create.value
    event.target.create.value = ''

    dispatch(createAnecdotes(content))
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
