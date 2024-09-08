import { TextInput, Button, Flex } from '@mantine/core'
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
      <Flex direction={'column'} align={'center'} w="100%" gap={10}>
        <TextInput
          label="Title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          placeholder="Enter Blog Title"
          data-testid="title-input"
          id="title-input"
        />
        <TextInput
          label="Author"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="Enter Blog Author"
          data-testid="author-input"
          id="author-input"
        />
        <TextInput
          label="Url"
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
          placeholder="Enter Blog Url"
          data-testid="url-input"
          id="url-input"
        />
        <Button type="submit" w="100%">
          create
        </Button>
      </Flex>
    </form>
  )
}
