import { render } from '@testing-library/react'
import React from 'react'
import Text from './Text';

describe('Test a Text Component', () => {

  test('render a text with a given string', () => {
    render(
        <Text id='test-string' label='PowerRanger'/>
    )

    const textElement: HTMLElement | null = document.querySelector('#test-string')

    expect(textElement).toBeInTheDocument()
  })
})