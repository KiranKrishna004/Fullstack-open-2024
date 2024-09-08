import { likeBlogs } from '../reducers/blogReducer'
import { notificationSetter } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

export const BlogPage = ({ blog }) => {
  const dispatch = useDispatch()
  const handleLike = (blog) => {
    dispatch(likeBlogs(blog))
    dispatch(notificationSetter(`liked ${blog.title}`))
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
    </div>
  )
}
