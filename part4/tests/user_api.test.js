const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)
describe('when creating new user', async () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUser)
  })

  test('users are returned as json', async () => {
    await api
      .get('/api/users/')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  describe('when adding new user', async () => {
    test('test if length of username more than 3', async () => {
      const newUser = {
        _id: '5a422a851b54a678234d17f6',
        username: 'ro',
        name: 'Kiran Krishna N',
        password: 'salainen',
        __v: 0,
      }
      await api.post('/api/users').send(newUser).expect(400).expect({
        error:
          'User validation failed: username: Path `username` (`ro`) is shorter than the minimum allowed length (3).',
      })
    })

    test('test if length of password more than 3', async () => {
      const newUser = {
        _id: '5a422a851b54a678234d17f6',
        username: 'root',
        name: 'Kiran Krishna N',
        password: '32',
        __v: 0,
      }
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect({ error: 'password length should be greater than 3' })
    })

    test('test length of response', async () => {
      const newUser = {
        _id: '5a422a851b54a678234d17f6',
        username: 'ksdhkjas',
        name: 'Kiran Krishna N',
        password: 'salainen',
        __v: 0,
      }

      await api.post('/api/users').send(newUser).expect(201)

      const content = await helper.usersInDb()

      assert.strictEqual(content.length, helper.initialUser.length + 1)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
