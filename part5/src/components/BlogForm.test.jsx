import { render, screen } from '@testing-library/react'
import { test } from 'vitest'
import { BlogForm } from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {
  let handleCreateBlog
  let container

  beforeEach(() => {
    handleCreateBlog = vi.fn()
    container = render(
      <BlogForm handleCreateBlog={handleCreateBlog} />
    ).container
  })

  test('check if create function is called with right data', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('create')

    const title = container.querySelector('#title-input')
    const url = container.querySelector('#url-input')
    const author = container.querySelector('#author-input')

    await user.type(title, 'Title')
    await user.type(url, 'URL')
    await user.type(author, 'Author')

    await user.click(button)
    expect(handleCreateBlog.mock.calls).toHaveLength(1)
    console.log(handleCreateBlog.mock.calls[0][0])
    expect(handleCreateBlog.mock.calls[0][0].title).toBe('Title')
    expect(handleCreateBlog.mock.calls[0][0].author).toBe('Author')
    expect(handleCreateBlog.mock.calls[0][0].url).toBe('URL')
  })
})
