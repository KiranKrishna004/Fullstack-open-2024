import { useEffect } from 'react'
import LoginForm from './components/LoginForm'

import { useDispatch, useSelector } from 'react-redux'
import { userCredGetter, userCredResetter } from './reducers/loginReducer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LandingPage } from './page/LandingPage'
import { UsersPage } from './page/UsersPage'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const message = useSelector((state) => state.notification)

  useEffect(() => {
    dispatch(userCredGetter())
  }, [])

  const handleLogout = () => {
    dispatch(userCredResetter())
  }

  if (!user) {
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
      <h2>blogs</h2>
      {message}
      <p>{user.username} is logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
