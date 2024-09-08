import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },

    addBlog(state, action) {
      return [...state, action.payload]
    },

    likeBlog(state, action) {
      console.log(state)
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      )
    },

    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export default blogSlice.reducer

export const { setBlogs, addBlog, likeBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()

    dispatch(setBlogs(blogs))
  }
}

export const addBlogs = (newBlog) => {
  return async (dispatch) => {
    const addedBlog = await blogService.create(newBlog)
    dispatch(addBlog(addedBlog))
  }
}

export const likeBlogs = (blog) => {
  return async (dispatch) => {
    const blogId = blog.id
    const newObj = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    const likedBlog = await blogService.updateBlog(blogId, newObj)
    dispatch(likeBlog(likedBlog))
  }
}

export const deleteBlogs = (id) => {
  return async (dispatch) => {
    await blogService.removeBlog(id)
    dispatch(deleteBlog(id))
  }
}
