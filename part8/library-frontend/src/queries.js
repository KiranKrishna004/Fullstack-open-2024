import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query getAllAuthors {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query getAllBooks($genre: String) {
    allBooks(genre: $genre) {
      id
      title
      published
      genres
      author {
        name
      }
    }
  }
`

export const ALL_GENRES = gql`
  query getAllBooks {
    allBooks {
      genres
    }
  }
`
