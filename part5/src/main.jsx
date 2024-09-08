import ReactDOM from 'react-dom/client'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import usersReducer from './reducers/usersReducer'
import { BrowserRouter as Router } from 'react-router-dom'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    auth: loginReducer,
    users: usersReducer,
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
