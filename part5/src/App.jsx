import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { userCredGetter, userCredResetter } from './reducers/loginReducer'
import { Routes, Route, useMatch } from 'react-router-dom'
import { LandingPage } from './page/LandingPage'
import { UsersPage } from './page/UsersPage'
import { UserPage } from './page/UserPage'
import { userSetter } from './reducers/usersReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { BlogPage } from './page/BlogPage'
import { Navbar } from './components/NavBar'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => {
    return [...state.blogs].sort((a, b) => b.likes - a.likes)
  })
  const auth = useSelector((state) => state.auth)
  const message = useSelector((state) => state.notification)
  const users = useSelector((state) => state.users)

  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(userCredGetter())
  }, [])

  useEffect(() => {
    dispatch(userSetter())
  }, [])

  if (!auth) {
    return (
      <>
        {message}
        <h2>Log in to Application</h2>
        <LoginForm />
      </>
    )
  }

  return (
    <div>
      <Navbar auth={auth} />
      <h2>blogs</h2>
      {message}
      {/* <p>{auth.username} is logged in</p>
      <button onClick={handleLogout}>logout</button> */}
      <Routes>
        <Route path="/blogs/:id" element={<BlogPage blog={blog} />} />
        <Route path="/users/:id" element={<UserPage user={user} />} />
        <Route path="/users" element={<UsersPage users={users} />} />
        <Route path="/" element={<LandingPage blogs={blogs} />} />
      </Routes>
    </div>
  )
}

export default App
