import { useQuery } from '@apollo/client'
import { ALL_BOOKS, GET_USER } from '../queries'

export const Recommend = () => {
  const { data, isLoading } = useQuery(GET_USER)

  const { data: userBookData, isUserBookData } = useQuery(ALL_BOOKS, {
    variables: { genre: data?.me.favoriteGenre },
  })

  if (isLoading || isUserBookData) {
    return <>Loading.....</>
  }
  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <strong>{data?.me.favoriteGenre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {userBookData?.allBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
