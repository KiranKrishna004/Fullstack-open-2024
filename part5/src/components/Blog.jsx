import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog, handleRemove }) => {
  const [isView, setIsView] = useState(false)

  const showWhenVisible = { display: isView ? '' : 'none' }

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
      <span data-testid="blogItem">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}{' '}
        </Link>
      </span>
    </div>
  )
}

export default Blog
