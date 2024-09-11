import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'
import { useState } from 'react'

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState(null)
  const { data: books, isLoading } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  })

  const { data: genreData, isLoading: isGenreLoading } = useQuery(ALL_GENRES)

  const genres = [
    ...new Set(genreData?.allBooks.map((book) => book.genres).flat()),
  ]

  if (isLoading || isGenreLoading) {
    return <div>Loading....</div>
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books?.allBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setSelectedGenre(genre)}>
          {genre}
        </button>
      ))}
    </div>
  )
}

export default Books
