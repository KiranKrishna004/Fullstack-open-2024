const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlog)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs/')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs are returned with identifier id', async () => {
    const response = await api
      .get('/api/blogs/')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogs = response.body

    blogs.forEach((blog) => {
      assert.ok(blog.id, 'id should be defined')
      assert.strictEqual(blog._id, undefined, '_id should be undefined')
    })
  })

  describe('when adding new blog', async () => {
    test('blog add creates a new blog post', async () => {
      const newBlog = {
        _id: '5a422bc61b54a676234d17fd',
        title: 'Type wars',
        author: 'Kiran Krishna N',
        url: 'http://blog.cleancoder.com/uncle-bob/2',
        likes: 2,
        __v: 0,
      }

      await api.post('/api/blogs/').send(newBlog).expect(201)

      const response = await api.get('/api/blogs/')

      assert.strictEqual(response.body.length, helper.initialBlog.length + 1)
    })

    test('blog likes missing should add 0 as default', async () => {
      const newBlog = {
        _id: '5a422bc61b54a676234d17fd',
        title: 'Type wars',
        author: 'Kiran Krishna N',
        url: 'http://blog.cleancoder.com/uncle-bob/2',
        __v: 0,
      }
      const response = await api.post('/api/blogs/').send(newBlog).expect(201)

      assert.strictEqual(response.body.likes, 0)
    })

    test('blogs without url or title throws 400', async () => {
      const newBlog = {
        _id: '5a422bc61b54a676234d17fd',
        author: 'Kiran Krishna N',
        likes: 2,
        __v: 0,
      }

      await api.post('/api/blogs/').send(newBlog).expect(400)
    })
  })

  describe('when deleting a blog', async () => {
    test('Check if blog is deleted by length', async () => {
      await api.delete('/api/blogs/5a422a851b54a676234d17f7').expect(200)

      const content = await helper.blogsInDb()

      assert.strictEqual(content.length, helper.initialBlog.length - 1)
    })

    test('Check if blog is deleted by search', async () => {
      const response = await api
        .delete('/api/blogs/5a422a851b54a676234d17f7')
        .expect(200)

      const content = await helper.blogsInDb()
      const deletedBlog = content.find((blog) => blog.id === response.id)

      assert.strictEqual(deletedBlog, undefined)
    })
  })

  describe('when updating a blog', async () => {
    test('test if it updates the blog', async () => {
      const beforeContent = helper.findBloginDb('5a422a851b54a676234d17f7')

      await api.put('/api/blogs/5a422a851b54a676234d17f7').expect(200)

      const afterContent = await helper.findBloginDb('5a422a851b54a676234d17f7')

      assert.notDeepStrictEqual(beforeContent, afterContent)
    })

    test('test if length of blogs remain the same', async () => {
      await api.put('/api/blogs/5a422a851b54a676234d17f7').expect(200)

      const content = await helper.blogsInDb()

      assert.strictEqual(content.length, helper.initialBlog.length)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
