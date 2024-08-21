const { test, describe } = require('node:test')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('when login', () => {
  test('test if login works', async () => {
    await api
      .post('/api/login')
      .send({ username: 'root', password: 'password' })
      .expect(200)
  })
})
