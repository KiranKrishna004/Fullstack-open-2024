import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const { mutate } = useMutation({
    mutationFn: createAnecdote,
    onError: (res) => {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: res.response.data.error,
      })

      setTimeout(() => {
        notificationDispatch({
          type: 'RESET_NOTIFICATION',
        })
      }, 5000)
    },
    onSuccess: (res) => {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `create anecdote '${res.content}`,
      })
      setTimeout(() => {
        notificationDispatch({
          type: 'RESET_NOTIFICATION',
        })
      }, 5000)
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
