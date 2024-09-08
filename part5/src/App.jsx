import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { BlogForm } from './components/BlogForm'
import { Togglable } from './components/Togglable'
import LoginForm from './components/LoginForm'
import {
  addBlogs,
  deleteBlogs,
  initializeBlogs,
  likeBlogs,
} from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { notificationSetter } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => {
    return [...state.blogs].sort((a, b) => b.likes - a.likes)
  })

  const message = useSelector((state) => state.notification)

  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    blogService.setToken(null)
    setUser(null)
  }

  const handleCreateBlog = (blogObj) => {
    blogFormRef.current.toggleVisibility()
    dispatch(addBlogs(blogObj))
    dispatch(notificationSetter(`added ${blogObj.title}`))
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

  if (!user) {
    return (
      <>
        {message}
        <h2>Log in to Application</h2>
        <LoginForm setUser={setUser} />
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {message}
      <p>{user.username} is logged in</p>
      <button onClick={handleLogout}>logout</button>
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
    </div>
  )
}

export default App
