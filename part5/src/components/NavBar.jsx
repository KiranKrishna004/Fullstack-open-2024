import { Flex, Button, Text } from '@mantine/core'
import { Link } from 'react-router-dom'
import { userCredResetter } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'

export const Navbar = ({ auth }) => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(userCredResetter())
  }

  return (
    <Flex
      justify={'space-between'}
      align="baseline"
      px={20}
      style={{
        boxShadow: '0 4px 2px -2px gray',
      }}
      py={20}
    >
      <Flex gap={5} align={'baseline'}>
        <Link to="/">Blogs</Link>
        <Link to="/users">Users</Link>
      </Flex>
      <Flex gap={10} align={'baseline'}>
        <Text>{auth.username} is logged in</Text>
        <Button onClick={handleLogout}>logout</Button>
      </Flex>
    </Flex>
  )
}
