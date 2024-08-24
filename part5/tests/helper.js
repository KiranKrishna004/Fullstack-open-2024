const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, url, author) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByTestId('url-input').fill(url)
  await page.getByTestId('author-input').fill(author)
  await page.getByTestId('title-input').fill(title)

  await page.getByRole('button', { name: 'create' }).click()
}

const deleteBlog = async (page, selectedBlog) => {
  const selectedBlogElement = selectedBlog.locator('..')
  await selectedBlogElement.getByRole('button', { name: 'view' }).click()

  page.on('dialog', async (dialog) => {
    await dialog.accept()
  })

  await selectedBlogElement.getByRole('button', { name: 'remove' }).click()
}

const viewBlog = async (page) => {
  let buttons = await page.getByRole('button', { name: 'view' })
  const t = true
  while (t) {
    // await page.waitForTimeout(1000)
    const buttonCount = await buttons.count()

    if (buttonCount === 0) {
      break
    }
    const button = buttons.first()

    await button.click()

    buttons = await page.getByRole('button', { name: 'view' })
    await page.waitForTimeout(1000)
  }
}

export { loginWith, createBlog, deleteBlog, viewBlog }
