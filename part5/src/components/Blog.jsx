import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove }) => {
  const [isView, setIsView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
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
