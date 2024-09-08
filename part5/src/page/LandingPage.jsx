import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from '../components/Blog'
import { BlogForm } from '../components/BlogForm'
import { Togglable } from '../components/Togglable'
import {
  addBlogs,
  deleteBlogs,
  initializeBlogs,
  likeBlogs,
} from '../reducers/blogReducer'
import { notificationSetter } from '../reducers/notificationReducer'

export const LandingPage = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => {
    return [...state.blogs].sort((a, b) => b.likes - a.likes)
  })

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const handleCreateBlog = (blogObj) => {
    blogFormRef.current.toggleVisibility()
    dispatch(addBlogs(blogObj))
    dispatch(
      notificationSetter(
        `a new blog ${blogObj.title} by ${blogObj.author} added`
      )
    )
  }

  const handleLike = (blog) => {
    dispatch(likeBlogs(blog))
    dispatch(notificationSetter(`liked ${blog.title}`))
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
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleRemove={handleRemove}
          />
        ))}
      </div>
    </>
  )
}
