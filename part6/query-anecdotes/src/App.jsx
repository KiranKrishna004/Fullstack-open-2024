import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { addVotes, getAnecdotes } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const {
    data: anecdotes,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  })

  const { mutate } = useMutation({
    mutationFn: addVotes,
    onSuccess: (res) => {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `anecdote '${res.content}' voted`,
      })

      setTimeout(() => {
        notificationDispatch({
          type: 'RESET_NOTIFICATION',
        })
      }, 5000)
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })
  const handleVote = (anecdote) => {
    mutate(anecdote)
  }

  if (isLoading || isFetching) {
    return <div>Loading....</div>
  }
  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes?.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
