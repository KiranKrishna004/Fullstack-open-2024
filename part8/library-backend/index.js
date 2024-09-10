const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/Book')
const Author = require('./models/Author')

require('dotenv').config()
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
    type Book {
        title: String!
        published: String!
        author: Author!
        id: ID!
        genres: [String!]
    }

    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author:String, genre:String): [Book!]
        allAuthors: [Author!]!
    }

    type Mutation {
      addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
      ): Book
      editAuthor(
        name: String!
        setBornTo: Int!
      ): Author
    }
`

const resolvers = {
  Mutation: {
    addBook: async (root, args) => {
      let foundAuthor = await Author.findOne({ name: args.author })

      try {
        if (!foundAuthor) {
          const author = new Author({ name: args.author, born: null })
          foundAuthor = await author.save()
        }
        const book = new Book({ ...args, author: foundAuthor._id })
        const createdBook = await book.save()
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

    editAuthor: async (root, args) => {
      const editedAuthor = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      )
      return editedAuthor
    },
  },
  Query: {
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
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
