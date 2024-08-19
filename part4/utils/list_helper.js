const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => (sum = sum + blog.likes), 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const result = blogs.reduce((max, blog) => {
    return max.likes > blog.likes ? max : blog
  }, blogs[0])

  return result
}

const mostBlogs = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, 'author')

  const authorBlogCounts = _.map(groupedByAuthor, (authorBlogs, author) => {
    return {
      author: author,
      blogs: authorBlogs.length,
    }
  })

  return _.maxBy(authorBlogCounts, 'blogs')
}

const mostLikes = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, 'author')

  const authorBlogLikeCounts = _.map(groupedByAuthor, (authorBlogs, author) => {
    return {
      author: author,
      likes: authorBlogs.reduce((acc, blog) => (acc = acc + blog.likes), 0),
    }
  })
  return _.maxBy(authorBlogLikeCounts, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
