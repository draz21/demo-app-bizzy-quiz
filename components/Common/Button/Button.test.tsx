import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import Button from './Button';

describe('Test a Button Component', () => {

  test('renders a button', () => {
    render(
        <Button label='test' onClick={() => {}}/>
    )

    const buttonElement = screen.getByRole('button', {
        name: /test/i
    })

    expect(buttonElement).toBeDefined()
  })

  test('test onClick event', async () => {
    const onClickFun = jest.fn();

    render(
      <Button label='test' onClick={onClickFun}/>
    )

    const buttonElement = screen.getByRole('button', {
      name: /test/i
    })

    await fireEvent.click(buttonElement);

    expect(onClickFun).toHaveBeenCalled();
  })

  test('button should be disabled', async () => {
    const onClickFun = jest.fn();

    render(
      <Button disabled={true} label='test' onClick={onClickFun}/>
    )

    const buttonElement = screen.getByRole('button', {
      name: /test/i
    })

    expect(buttonElement).toBeDisabled();
  })

  test('Icon Should be displayed', async () => {
    const onClickFun = jest.fn();

    render(
      <Button icon='<div id="icon">hi</div>' label='test' onClick={onClickFun}/>
    )

    const buttonElement = screen.getByRole('button', {
      name: /test/i
    })

    await fireEvent.click(buttonElement);
    expect(onClickFun).toHaveBeenCalled();
    expect(document.querySelector('#icon')).toBeDefined()
  })
})