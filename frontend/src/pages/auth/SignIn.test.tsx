import { render, screen } from '@testing-library/react'
import SignIn from './SignIn'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../../state/auth'

test('renders sign in form', () => {
  render(<MemoryRouter><AuthProvider><SignIn /></AuthProvider></MemoryRouter>)
  expect(screen.getByText(/sign in/i)).toBeInTheDocument()
})
