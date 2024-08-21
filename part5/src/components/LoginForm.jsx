import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

export const LoginForm = ({ setMessage, setUser }) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: userName,
        password,
      })
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUserName('')
      setPassword('')
    } catch (e) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username:{' '}
        <input
          type="text"
          value={userName}
          name="Username"
          onChange={({ target }) => setUserName(target.value)}
        />
      </div>
      <div>
        password:{' '}
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}
