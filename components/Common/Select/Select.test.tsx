import { fireEvent, render, screen } from "@testing-library/react";
import { Theme } from '@radix-ui/themes';
import Selector from "./Select";

describe('test a selector component', () => {

    const mockOptions = [
        { value : 'apple', label: 'apple'}, 
        { value: 'orange', label: 'orange'}
    ]

    const mockOnChange = jest.fn()

    window.ResizeObserver = jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
    }))

    test('default select box', () => {
        const { container } = render(
            <Theme><Selector id="test-select" options={mockOptions} onChange={mockOnChange}/></Theme>
        )
        expect(container.querySelector('#test-select')).toBeInTheDocument()
    })

    test('option should be displayed' , async () => {
        const { container } = render(
            <Theme><Selector variant="classic" id="test-select" options={mockOptions} onChange={mockOnChange}/></Theme>
        )

        //clikc the select to display options
        const selectElement = screen.getByRole('combobox')
        await fireEvent.click(selectElement)
    })
})