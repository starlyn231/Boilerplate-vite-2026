import { describe, expect, it } from 'vitest'
import { render, screen } from './test/test-utils'
import App from './App'

describe('App', () => {
  it('renders the button', () => {
    render(<App />)

    expect(screen.getByRole('button', { name: /funciona/i })).toBeInTheDocument()
  })
})
