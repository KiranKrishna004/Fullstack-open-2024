const usersRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body
  if (password.length > 3) {
    try {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)
      const user = new User({ username, name, passwordHash })
      const savedUser = await user.save()

      response.status(201).json(savedUser)
    } catch (e) {
      next(e)
    }
  } else {
    response
      .status(400)
      .send({ error: 'password length should be greater than 3' })
      .end()
  }
})

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', {
      url: 1,
      title: 1,
      author: 1,
    })
    response.status(200).json(users)
  } catch (e) {
    next(e)
  }
})

module.exports = usersRouter
