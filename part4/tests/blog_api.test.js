const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcryptjs')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({
      _id: '5a422a851b54a676234d17f1',
      username: 'root',
      name: 'KiranKrishnaN',
      blogs: [],
      passwordHash: passwordHash,
      __v: 0,
    })

    await user.save()

    const id = user.id

    const blogObject = helper.initialBlog.map(
      (blog) =>
        new Blog({
          _id: blog._id,
          title: blog.title,
          author: blog.author,
          url: blog.url,
          user: id.toString(),
          likes: blog.likes ?? 0,
        })
    )
    const promiseArray = blogObject.map((blog) => {
      blog.save()
      user.blogs = user.blogs.concat(blog.id)
    })
    await Promise.all(promiseArray)

    await user.save()
  })

  // beforeEach(async () => {})

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
    let header
    beforeEach(async () => {
      const user = {
        username: 'root',
        password: 'password',
      }

      const loginUser = await api.post('/api/login').send(user)

      header = {
        Authorization: `Bearer ${loginUser.body.token}`,
      }
    })
    test('blog add creates a new blog post', async () => {
      const newBlog = {
        title: 'Type wars',
        author: 'Kiran Krishna N',
        url: 'http://blog.cleancoder.com/uncle-bob/2',
        likes: 2,
        userId: '5a422a851b54a676234d17f1',
        __v: 0,
      }

      await api.post('/api/blogs/').set(header).send(newBlog).expect(201)

      const content = await helper.blogsInDb()

      assert.strictEqual(content.length, helper.initialBlog.length + 1)
    })

    test('blog likes missing should add 0 as default', async () => {
      const newBlog = {
        title: 'Type wars',
        author: 'Kiran Krishna N',
        url: 'http://blog.cleancoder.com/uncle-bob/2',
        userId: '5a422a851b54a676234d17f1',
        __v: 0,
      }

      const response = await api
        .post('/api/blogs/')
        .send(newBlog)
        .set(header)
        .expect(201)

      assert.strictEqual(response.body.likes, 0)
    })

    test('blogs without url or title throws 400', async () => {
      const newBlog = {
        author: 'Kiran Krishna N',
        likes: 2,
        userId: '5a422a851b54a676234d17f1',
        __v: 0,
      }

      await api.post('/api/blogs/').send(newBlog).set(header).expect(400)
    })
  })

  describe('when deleting a blog', async () => {
    let header
    beforeEach(async () => {
      const user = {
        username: 'root',
        password: 'password',
      }

      const loginUser = await api.post('/api/login').send(user)

      header = {
        Authorization: `Bearer ${loginUser.body.token}`,
      }
    })

    test('Check if blog is deleted by length', async () => {
      await api
        .delete('/api/blogs/5a422a851b54a676234d17f7')
        .set(header)
        .expect(200)

      const content = await helper.blogsInDb()

      assert.strictEqual(content.length, helper.initialBlog.length - 1)
    })

    test('Check if blog is deleted by search', async () => {
      const response = await api
        .delete('/api/blogs/5a422a851b54a676234d17f7')
        .set(header)
        .expect(200)

      const content = await helper.blogsInDb()
      const deletedBlog = content.find((blog) => blog.id === response.id)

      assert.strictEqual(deletedBlog, undefined)
    })
  })

  describe('when updating a blog', async () => {
    test('test if it updates the blog', async () => {
      const beforeContent = helper.findBloginDb('5a422aa71b54a676234d17f8')

      await api
        .put('/api/blogs/5a422aa71b54a676234d17f8')
        .send({ title: 'sjkhdkjasd' })
        .expect(200)

      const afterContent = await helper.findBloginDb('5a422aa71b54a676234d17f8')

      assert.notDeepStrictEqual(beforeContent, afterContent)
    })

    test('test if length of blogs remain the same', async () => {
      await api.put('/api/blogs/5a422aa71b54a676234d17f8').expect(200)

      const content = await helper.blogsInDb()

      assert.strictEqual(content.length, helper.initialBlog.length)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
