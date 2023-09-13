import { render, waitFor} from "@testing-library/react";
import CustomTextField from "./TextField";
import userEvent from '@testing-library/user-event'

describe('Test A Custom TextField Component', () => {

    const mockOnChange = jest.fn()

    test('Render Custom TextField', () => {
        const { container } = render(
            <CustomTextField id="test_tf" onChange={mockOnChange}/>
        )
        expect(container.querySelector('#test_tf')).toBeInTheDocument()
    })

    test('Render Icon Props', () => {
        const mockIcon = <div id='mock_icon'>I</div>
        const { container } = render(
            <CustomTextField icon={mockIcon} id="test_tf" onChange={mockOnChange}/>
        )
        expect(container.querySelector("#mock_icon")).toBeInTheDocument()
    })

    test('value should be changed when enter value' , async () => {
        const { container } = render(
            <CustomTextField type="text" id="test_tf" onChange={mockOnChange}/>
        )
        const tfElement = container.querySelector('#test_tf')
        await waitFor(() => expect(tfElement).toBeDefined() , {
            timeout: 30000
        })
        if(tfElement) {
            await userEvent.type(tfElement,'Hello')
            expect(tfElement).toHaveValue('Hello')
        }
    })
});