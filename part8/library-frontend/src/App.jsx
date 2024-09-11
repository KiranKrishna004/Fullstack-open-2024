import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Login } from './components/Login'
import { useApolloClient } from '@apollo/client'
import { Recommend } from './components/Recommend'

const App = () => {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('user-token')
    setUser(token)
  }, [])

  const RenderSection = (page) => {
    switch (page) {
      case 'authors':
        return <Authors />
      case 'books':
        return <Books />

      case 'add':
        return <NewBook />

      case 'login':
        return <Login setUser={setUser} setPage={setPage} />

      case 'recommend':
        return <Recommend />
      default:
        return <></>
    }
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {user && (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
          </>
        )}

        {!user && <button onClick={() => setPage('login')}>login</button>}
        {user && (
          <button
            onClick={() => {
              setUser(null)
              localStorage.clear()
              client.resetStore()
              setPage('books')
            }}
          >
            logout
          </button>
        )}
      </div>
      {RenderSection(page)}
    </div>
  )
}

export default App
