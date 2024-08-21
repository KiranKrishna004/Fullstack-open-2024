const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
    })
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogRouter.post(
  '/',
  middleware.userExtractor,
  async (request, response, next) => {
    const { title, author, url, likes } = request.body
    if (!url || !title) {
      response.status(400).end()
    }

    try {
      const user = request.user
      if (!user) {
        return response
          .status(401)
          .json({ error: 'token is missing or invalid' })
      }

      const blog = new Blog({
        title: title,
        url: url,
        likes: likes ?? 0,
        author: author,
        user: user.id,
      })

      const result = await blog.save()
      user.blogs = user.blogs.concat(result.id)
      await user.save()
      response.status(201).json(result.toJSON())
    } catch (error) {
      next(error)
    }
  }
)

blogRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      const user = request.user

      const blog = await Blog.findById(request.params.id)
      if (blog) {
        logger.info(user.id.toString(), blog.user.toString())

        if (user.id.toString() === blog.user.toString()) {
          const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
          response.status(200).json(deletedBlog)
        } else {
          response.status(403).json({ error: 'You cannot delete this blog' })
        }
      } else {
        response.status(400).json({ error: "Blog doesn't exist" })
      }
    } catch (error) {
      next(error)
    }
  }
)

blogRouter.put('/:id', async (request, response, next) => {
  const blog = request.body

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    })
    response.status(200).json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter
