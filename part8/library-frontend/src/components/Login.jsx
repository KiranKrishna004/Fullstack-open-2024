import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { LOGIN } from '../mutations'

export const Login = ({ setUser, setPage }) => {
  const [loginMutation, { data }] = useMutation(LOGIN)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (data) {
      const token = data.login.value
      setUser(token)
      localStorage.setItem('user-token', token)
      setPage('books')
    }
  }, [data])

  const handleLogin = (e) => {
    e.preventDefault()

    loginMutation({
      variables: {
        username: name,
        password: password,
      },
    })
  }

  return (
    <form onSubmit={handleLogin}>
      <label>
        Name:
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Passoword:
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button>login</button>
    </form>
  )
}
