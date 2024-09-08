import { Flex, Button, Text, TextInput, List } from '@mantine/core'

import { useField } from '../hooks/useField'
import { addComments, likeBlogs } from '../reducers/blogReducer'
import { notificationSetter } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

export const BlogPage = ({ blog }) => {
  const comment = useField('text')
  const dispatch = useDispatch()
  const handleLike = (blog) => {
    dispatch(likeBlogs(blog))
    dispatch(notificationSetter(`liked ${blog.title}`))
  }
  const handleAddComment = (event) => {
    event.preventDefault()
    dispatch(addComments(blog.id, comment.value))
  }
  if (!blog) {
    return <></>
  }
  return (
    <Flex direction={'column'}>
      <h2>{blog.title}</h2>
      <a href={blog.url} target="_blank" rel="noreferrer">
        {blog.url}
      </a>
      <Flex align={'baseline'} gap={10}>
        <p data-testid="likes">Likes: {blog.likes}</p>
        <Button size="xs" onClick={() => handleLike(blog)} id="like-button">
          like
        </Button>
      </Flex>
      <Text>
        Added By{' '}
        <Text span fw={700} c="white">
          {blog.user.name}
        </Text>
      </Text>
      <Flex pt={50}>
        <form onSubmit={handleAddComment}>
          <TextInput size="xs" label="Comment" {...comment} />
          <Button size="xs" mt={10} type="submit">
            add comment
          </Button>
        </form>
      </Flex>

      <h3>comments</h3>
      <List withPadding>
        {blog.comments.map((comment) => (
          <List.Item key={comment}>{comment}</List.Item>
        ))}
      </List>
    </Flex>
  )
}
