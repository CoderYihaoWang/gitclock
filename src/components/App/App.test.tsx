import React from 'react'
import {render} from '@testing-library/react'
import App from './App'
describe('App', () => {
  it('renders child components', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId('input')).toBeInTheDocument()
    expect(getByTestId('stats')).toBeInTheDocument()
  })
})

