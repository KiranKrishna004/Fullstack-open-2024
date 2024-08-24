import { test } from '@playwright/test'
import { loginWith, createBlog, deleteBlog, viewBlog } from './helper'

const { describe, beforeEach, expect } = test

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Kiran Krishna N',
        username: 'root',
        password: 'password',
      },
    })

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'SuperTest',
        username: 'root1',
        password: 'password2',
      },
    })

    await page.goto('/')
  })
  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'root', 'password')

      await expect(page.getByText('root is logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'root', 'password1')

      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'password')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Test Title', 'Test Url', 'Test Author')

      await expect(
        page.getByText('a new blog Test Title by Test Author added')
      ).toBeVisible()
    })

    describe('When blogs are added', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Test Title1', 'Test Url1', 'Test Author1')
        await createBlog(page, 'Test Title2', 'Test Url2', 'Test Author2')
        await createBlog(page, 'Test Title3', 'Test Url3', 'Test Author3')
      })

      test('a blog can be liked', async ({ page }) => {
        const selectedBlog = page.getByText('Test Title1 Test Author1')
        const selectedBlogElement = selectedBlog.locator('..')
        await selectedBlogElement.getByRole('button', { name: 'view' }).click()

        await expect(
          selectedBlogElement.getByRole('button', { name: 'like' })
        ).toBeVisible()
      })

      test('a blog can be deleted by user', async ({ page }) => {
        const selectedBlog = page.getByText('Test Title1 Test Author1')

        await deleteBlog(page, selectedBlog)

        await expect(selectedBlog).not.toBeAttached({ timeout: 10000 })
      })

      test('a blog cannot be deleted by another user', async ({ page }) => {
        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'root1', 'password2')

        const selectedBlog = page.getByText('Test Title1 Test Author1')
        await deleteBlog(page, selectedBlog)
        await expect(page.getByText('You cannot delete this blog')).toBeVisible(
          { timeout: 3000 }
        )
      })

      test('they are in descending order of likes', async ({ page }) => {
        test.setTimeout(60000)
        await viewBlog(page)

        const selectedBlog = page.getByText('Test Title2 Test Author2')
        const selectedBlogElement = selectedBlog.locator('..')

        await selectedBlogElement.getByRole('button', { name: 'like' }).click()
        await page.waitForTimeout(1000)

        await selectedBlogElement.getByRole('button', { name: 'like' }).click()
        await page.waitForTimeout(3000)

        let elements = await page.getByTestId('likes')

        const likes = await elements.evaluateAll(
          (items) =>
            items.map((item) => Number(item.textContent.trim().split(': ')[1])) // Extract text and trim whitespace
        )

        const sortedArray = likes.slice()

        sortedArray.sort((a, b) => b - a)

        expect(likes).toEqual(sortedArray)
      })
    })
  })
})
