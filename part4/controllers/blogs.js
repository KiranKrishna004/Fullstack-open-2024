const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogRouter.post('/', async (request, response, next) => {
  if (!request.body.url || !request.body.title) {
    response.status(400).end()
  }

  if (!request.body.likes) {
    request.body.likes = 0
  }

  const blog = new Blog(request.body)
  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(request.params.id)
    response.status(200).json(blog)
  } catch (error) {
    next(error)
  }
})

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
