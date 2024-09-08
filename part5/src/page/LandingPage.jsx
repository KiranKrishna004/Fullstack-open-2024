import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from '../components/Blog'
import { BlogForm } from '../components/BlogForm'
import { Togglable } from '../components/Togglable'
import { addBlogs, deleteBlogs, likeBlogs } from '../reducers/blogReducer'
import { notificationSetter } from '../reducers/notificationReducer'

export const LandingPage = ({ blogs }) => {
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const handleCreateBlog = (blogObj) => {
    blogFormRef.current.toggleVisibility()
    dispatch(addBlogs(blogObj))
    dispatch(
      notificationSetter(
        `a new blog ${blogObj.title} by ${blogObj.author} added`
      )
    )
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(deleteBlogs(blog.id))
        dispatch(notificationSetter(`deleted blog: ${blog.id}`))
      } catch (e) {
        dispatch(notificationSetter('You cannot delete this blog'))
      }
    }
  }

  return (
    <>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>
      <div data-testid="blog-listings">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} handleRemove={handleRemove} />
        ))}
      </div>
    </>
  )
}
