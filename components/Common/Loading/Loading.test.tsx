import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import Loading from './Loading';

describe('Test a Loader Component', () => {

  test('render a loader', () => {
    render(
        <Loading />
    )

    const Loader = document.querySelector('#loader')

    expect(Loader).toBeDefined()
  })
})