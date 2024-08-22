import { useState } from 'react'
import PropTypes from 'prop-types'

export const BlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleCreateBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  BlogForm.propTypes = {
    handleCreateBlog: PropTypes.func.isRequired,
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:{' '}
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          placeholder="Enter Blog Title"
          id="title-input"
        />
      </div>
      <div>
        author:{' '}
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="Enter Blog Author"
          id="author-input"
        />
      </div>
      <div>
        url:{' '}
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
          placeholder="Enter Blog Url"
          id="url-input"
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}
