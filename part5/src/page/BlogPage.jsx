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
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url} target="_blank" rel="noreferrer">
        {blog.url}
      </a>
      <p data-testid="likes">Likes: {blog.likes}</p>
      {'  '}
      <button onClick={() => handleLike(blog)} id="like-button">
        like
      </button>
      <p>Added By {blog.user.name}</p>

      <h3>comments</h3>
      <form onSubmit={handleAddComment}>
        comment: <input {...comment} />
        <button>add comment</button>
      </form>

      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}
