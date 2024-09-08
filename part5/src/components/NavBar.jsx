import { Link } from 'react-router-dom'
import { userCredResetter } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
export const Navbar = ({ auth }) => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(userCredResetter())
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 10,
        backgroundColor: 'grey',
      }}
    >
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      <p>{auth.username} is logged in</p>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}
