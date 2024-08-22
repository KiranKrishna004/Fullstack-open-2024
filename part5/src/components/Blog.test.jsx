import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, test } from 'vitest'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  let blog
  let handleLike
  let handleRemove
  let container

  beforeEach(() => {
    blog = {
      title: 'qweruih',
      author: 'ih',
      url: 'iuhwi',
      likes: 0,
      user: {
        username: 'root2',
        name: 'Superuser',
        id: '66c530171728709071406b61',
      },
      id: '66c60d28ac5203793f5ba607',
    }
    handleLike = vi.fn()
    handleRemove = vi.fn()

    container = render(
      <Blog blog={blog} handleRemove={handleRemove} handleLike={handleLike} />
    ).container
  })

  test('at start the url and likes are not displayed', async () => {
    const div = container.querySelector('.isViewContent')
    expect(div).toHaveStyle('display: none')
  })

  test('at start the url and likes are displayed after view button click', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.isViewContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
    const user = userEvent.setup()
    const likeButton = screen.getByText('like')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})
