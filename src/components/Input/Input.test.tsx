import React from 'react'
import {render} from '@testing-library/react'
import Input from "./Input";

describe('Input', () => {
  it('displays title, input and button', () => {
    const {getByTestId} = render(<Input setStats={() => null} />)
    expect(getByTestId('input-header')).toBeInTheDocument()
    expect(getByTestId('input-input')).toBeInTheDocument()
    expect(getByTestId('input-footer')).toBeInTheDocument()
  })
})