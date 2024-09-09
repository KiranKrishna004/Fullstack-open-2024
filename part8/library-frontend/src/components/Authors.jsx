import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import { useState } from 'react'
import { EDIT_BIRTH } from '../mutations'

const Authors = ({ show }) => {
  const { data: authors, isLoading } = useQuery(ALL_AUTHORS)
  const [updateAuthorBirth] = useMutation(EDIT_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.message)
    },
  })
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    updateAuthorBirth({
      variables: { name: name, setBornTo: Number(year) },
    })
  }

  if (!show) {
    return null
  }
  if (isLoading) {
    return <div>Loading....</div>
  }

  if (!authors) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors?.allAuthors?.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set Birth Year</h2>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit}
      >
        <label>
          Author Name
          <select onChange={(e) => setName(e.target.value)}>
            {authors?.allAuthors.map((author) => (
              <option value={author.name} key={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Birth Year
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </label>
        <button>update author</button>
      </form>
    </div>
  )
}

export default Authors
