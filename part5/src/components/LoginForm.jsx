import { useState } from 'react'
import { notificationSetter } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { userCredSetter } from '../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(
      userCredSetter({
        username: userName,
        password,
      })
    )
    setUserName('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username:{' '}
        <input
          type="text"
          value={userName}
          data-testid="username"
          name="Username"
          onChange={({ target }) => setUserName(target.value)}
        />
      </div>
      <div>
        password:{' '}
        <input
          type="password"
          value={password}
          data-testid="password"
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}
export default LoginForm
