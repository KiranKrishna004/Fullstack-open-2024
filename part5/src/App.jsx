import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { BlogForm } from './components/BlogForm'
import { Togglable } from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    getandSetBlogs()
  }, [])

  const getandSetBlogs = () => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }

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
    blogService
      .create(blogObj)
      .then(() => {
        setMessage(`a new blog ${blogObj.title} by ${blogObj.author} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        getandSetBlogs()
      })
      .catch((e) => {
        setMessage('Failed Creating Blog')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const handleLike = async (blog) => {
    const blogId = blog.id
    const newObj = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    const updatedBlog = await blogService.updateBlog(blogId, newObj)

    setBlogs(
      blogs.map((blog) =>
        blog.id === updatedBlog.id
          ? { ...blog, likes: updatedBlog.likes }
          : blog
      )
    )
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.removeBlog(blog.id)
        getandSetBlogs()
      } catch (e) {
        setMessage('You cannot delete this blog')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    }
  }

  if (!user) {
    return (
      <>
        {message}
        <h2>Log in to Application</h2>
        <LoginForm setUser={setUser} setMessage={setMessage} />
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {message}
      <p>{user.username} is logged in</p>{' '}
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>
      <div data-testid="blog-listings">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
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
