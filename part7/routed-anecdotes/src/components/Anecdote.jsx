export const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more info see{' '}
        <a href={anecdote.info} target="__blank">
          {anecdote.info}
        </a>
      </p>
    </div>
  )
}
