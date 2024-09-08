import ReactDOM from 'react-dom/client'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import { Provider } from 'react-redux'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
