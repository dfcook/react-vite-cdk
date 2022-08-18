import { describe, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App test', () => {
  test('Should show title', () => {
    render(<App />)

    expect(screen.getByText(/Click on the Vite and React logos to learn more/i)).toBeDefined()
  })
})
