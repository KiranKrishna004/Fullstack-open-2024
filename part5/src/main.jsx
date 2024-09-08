import ReactDOM from 'react-dom/client'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import usersReducer from './reducers/usersReducer'
import { BrowserRouter as Router } from 'react-router-dom'
import { createTheme, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    auth: loginReducer,
    users: usersReducer,
  },
})

const theme = createTheme({
  /** Your theme override here */
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Router>
        <App />
      </Router>
    </MantineProvider>
  </Provider>
)
