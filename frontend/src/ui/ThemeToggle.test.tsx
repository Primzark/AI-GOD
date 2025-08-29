import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeToggle } from './ThemeToggle'

test('toggles theme', () => {
  render(<ThemeToggle />)
  const btn = screen.getByRole('button', { name: /toggle theme/i })
  fireEvent.click(btn)
  expect(document.documentElement.classList.contains('dark')).toBeTruthy()
})
