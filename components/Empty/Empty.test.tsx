import { render, screen } from "@testing-library/react";
import Empty from "./Empty";

describe('Test a Empty Component', () => {
    
    test('Render a default screen with image', () => {
        render(<Empty src="/image.jpg"/>)

        const image = screen.getByRole('img',{
            name : 'Welcome'
        })

        expect(image).toBeDefined()
    })

    test('Texts should be displayed in the screen', () => {
        const { container } = render(<Empty src="/image.jpg"/>)

        expect(container.querySelector('#title_1')).toHaveTextContent('Bizzy Quiz')
        expect(container.querySelector('#title_2')).toHaveTextContent('Take you first quiz to test your knowledge')
    })
})