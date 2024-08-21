import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleLike, handleRemove }) => {
  const [isView, setIsView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleUpdate = (blog) => {
    const blogId = blog.id
    const newObj = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    blogService.updateBlog(blogId, newObj)
  }
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={() => setIsView(!isView)}>
        {isView ? 'hide' : 'view'}
      </button>
      {isView && (
        <div>
          <p>{blog.url}</p>
          <div>
            Likes: {blog.likes}
            {'  '}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          <p>{blog.user.name}</p>
          <button onClick={() => handleRemove(blog)}>remove</button>
        </div>
      )}
    </div>
  )
}

export default Blog
