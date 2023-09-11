import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import ResultInterFace from "@/interface/Result"
import Success from './Success';

describe('Test a Success Component', () => {

  jest.mock('module',()=>({
    __esModule: true,                    // this makes it work
    default: jest.fn()
  }));

  const successMockData: ResultInterFace = {
    result: 90,
    status: 'Passed',
    corrAns: ['Women'],
    wrongAnswers: ['Men']
  }

  const completeMockData: ResultInterFace = {
    result: 100,
    status: 'Passed',
    corrAns: [],
    wrongAnswers: []
  }

  const failedMockData: ResultInterFace = {
    result: 40,
    status: 'Failed',
    corrAns: ['test','a','2','4','6','7'],
    wrongAnswers: ['test','a','2','4','6','7']
  }

  const mockOnClick = jest.fn()

  test('renders a screen for passed status', async () => {
    const { container } = render(
        <Success data={successMockData} onClick={mockOnClick}/>
    )

    const titleElement: HTMLElement | null = screen.getByTestId('success-title');
    expect(titleElement).toHaveTextContent('Passed');

    //should display answers lists
    const resultContainer: HTMLElement | null = container.querySelector('#result-details');
    expect(resultContainer).toBeInTheDocument();
    // expect(resultContainer).toContainHTML('<ul class="list-disc text-lg px-6" id="result-details"><li>Your Answer : Men  - Correct Answer : Women</li></ul>')

    //should display description
    const description: HTMLElement | null = screen.getByTestId('success-desc');
    expect(description).toBeDefined();
    expect(description).toHaveTextContent('You are in a great shape. Keep doing this')

    const buttonElement = screen.getByRole('button', {
      name: /Retake Quiz/i
    })
    expect(buttonElement).toBeDefined()
    await fireEvent.click(buttonElement);
    expect(mockOnClick).toBeCalled()
  })

  test('renders a screen for complete status', async () => {
    const { container } = render(
        <Success data={completeMockData} onClick={mockOnClick}/>
    )

    const titleElement: HTMLElement | null = screen.getByTestId('success-title');
    expect(titleElement).toHaveTextContent('Passed');

    //should display answers lists
    const resultContainer: HTMLElement | null = container.querySelector('#result-details');
    expect(resultContainer).toBeNull();
    const passedLabel: HTMLElement | null = container.querySelector('#passed-label');
    expect(passedLabel).toBeInTheDocument();
    expect(passedLabel).toHaveTextContent('You have chosen all of the correct answers!');

    //should display description
    const description: HTMLElement | null = screen.getByTestId('success-desc');
    expect(description).toBeDefined();
    expect(description).toHaveTextContent('You are in a great shape. Keep doing this')

    const buttonElement = screen.getByRole('button', {
      name: /Retake Quiz/i
    })
    expect(buttonElement).toBeDefined()
    await fireEvent.click(buttonElement);
    expect(mockOnClick).toBeCalled()
  })

  test('renders a screen for failed status', async () => {
    const { container } = render(
        <Success data={failedMockData} onClick={mockOnClick}/>
    )

    const titleElement: HTMLElement | null = screen.getByTestId('success-title');
    expect(titleElement).toHaveTextContent('Failed');

    //should display answers lists
    const resultContainer: HTMLElement | null = container.querySelector('#result-details');
    expect(resultContainer).toBeInTheDocument();

    //should display description
    const description: HTMLElement | null = screen.getByTestId('success-desc');
    expect(description).toBeDefined();
    expect(description).toHaveTextContent('You need to study more!')

    const buttonElement = screen.getByRole('button', {
      name: /Retake Quiz/i
    })
    expect(buttonElement).toBeDefined()
    await fireEvent.click(buttonElement);
    expect(mockOnClick).toBeCalled()
  })
})