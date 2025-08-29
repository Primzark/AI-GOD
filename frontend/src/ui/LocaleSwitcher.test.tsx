import { render, screen, fireEvent } from '@testing-library/react'
import { LocaleSwitcher } from './LocaleSwitcher'
import '../i18n'

test('switches locale', () => {
  render(<LocaleSwitcher />)
  const btn = screen.getByRole('button')
  const before = btn.textContent
  fireEvent.click(btn)
  expect(btn.textContent).not.toBe(before)
})
