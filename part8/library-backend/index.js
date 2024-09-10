const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/Book')
const Author = require('./models/Author')

require('dotenv').config()
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
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

let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
 */

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
]

/*
  you can remove the placeholder query once your first one has been implemented 
*/

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
        return createdBook
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

    editAuthor: (root, args) => {
      const foundAuthor = authors.find((author) => author.name === args.name)

      if (!foundAuthor) {
        return null
      } else {
        const editedAuthor = { ...foundAuthor, born: args.setBornTo }
        authors = authors.map((author) =>
          author.name === args.name ? editedAuthor : author
        )

        return editedAuthor
      }
    },
  },
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      try {
        const books = await Book.find({
          genres: args.genre,
        }).populate({
          path: 'author',
          match: { name: args.author }, // Filter by author's name
        })

        const filteredBooks = books.filter((book) => book.author !== null)
        return filteredBooks
      } catch (e) {
        throw new GraphQLError('Failed finding books', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: { author: args.author, genres: args.genre },
            error,
          },
        })
      }
      // return books.filter((book) => {
      //   const matchesAuthor = !args.author || book.author === args.author
      //   const matchesGenre = !args.genre || book.genres.includes(args.genre)
      //   return matchesAuthor && matchesGenre
      // })
    },
    allAuthors: async () => Author.find({}),
  },

  Author: {
    bookCount: (root) => {
      const count = books.filter((books) => books.author === root.name).length

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
