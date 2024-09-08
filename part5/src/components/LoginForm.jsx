import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userCredSetter } from '../reducers/loginReducer'
import { Flex, Button, TextInput } from '@mantine/core'

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
      <Flex direction={'column'} align={'center'} gap={20}>
        <TextInput
          label="User Name"
          type="text"
          value={userName}
          data-testid="username"
          name="Username"
          onChange={({ target }) => setUserName(target.value)}
        />
        <TextInput
          label="Password"
          type="password"
          value={password}
          data-testid="password"
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button type="submit">login</Button>
      </Flex>
    </form>
  )
}
export default LoginForm
