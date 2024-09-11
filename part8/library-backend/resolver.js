const Book = require('./models/Book')
const Author = require('./models/Author')
const { GraphQLError } = require('graphql')
const User = require('./models/User')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const jwt = require('jsonwebtoken')

const resolvers = {
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })
      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'kiran004narath') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      let foundAuthor = await Author.findOne({ name: args.author })

      try {
        if (!foundAuthor) {
          const author = new Author({ name: args.author, born: null })
          foundAuthor = await author.save()
        }
        const book = new Book({ ...args, author: foundAuthor._id })
        const createdBook = await book.save()

        pubsub.publish('BOOK_ADDED', {
          bookAdded: createdBook.populate('author'),
        })
        return createdBook.populate('author')
      } catch (error) {
        throw new GraphQLError('Creating the book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author,
            error,
          },
        })
      }
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const editedAuthor = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      )
      return editedAuthor
    },
  },
  Query: {
    me: (root, args, { currentUser }) => currentUser,
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      try {
        let query = {}

        if (args.genre) {
          query.genres = { $in: [args.genre] }
        }

        if (args.author) {
          const author = await Author.findOne({ name: args.author })
          if (!author) {
            throw new GraphQLError('Author not found', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: { author: args.author },
              },
            })
          }
          query.author = author._id
        }

        const books = await Book.find(query).populate('author')
        return books
      } catch (e) {
        throw new GraphQLError('Failed finding books', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: { author: args.author, genres: args.genre },
            error,
          },
        })
      }
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root._id })
      const count = books.length

      return count
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers
