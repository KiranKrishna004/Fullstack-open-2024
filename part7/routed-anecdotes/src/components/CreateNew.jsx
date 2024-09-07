import { useField } from '../hooks'

export const CreateNew = (props) => {
  const { reset: contentReset, ...content } = useField('text')
  const { reset: authorReset, ...author } = useField('text')
  const { reset: infoReset, ...info } = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      infor: info.value,
      votes: 0,
    })
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...content} />
        </div>
        <div>
          author
          <input name="author" {...author} />
        </div>
        <div>
          url for more info
          <input name="info" {...info} />
        </div>
        <button type={'submit'}>create</button>
      </form>
      <button
        onClick={() => {
          authorReset()
          infoReset()
          contentReset()
        }}
      >
        reset
      </button>
    </div>
  )
}
