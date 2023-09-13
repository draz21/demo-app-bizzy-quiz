import {test, expect} from '@playwright/test'
import { waitFor } from '@testing-library/dom';

const goToBizzyQuiz = async(page: any) => {
    await page.goto('http://localhost:3000/');  

    await page.waitForURL('http://localhost:3000/');

    await page.locator('img#empty_image').waitFor()
}

const displayQuestionComponent = async (page: any) => {
    //get question component should be displayed
    const questionTitle = await page.locator('#bizzy-quiz-0-title')
    expect(questionTitle).toBeDefined()
    await expect(questionTitle).toHaveText(/.*?/ , {timeout: 20000})
    await expect(page.locator('#bizzy-quiz-0-answer-0')).toHaveText(/.*?/ , {timeout: 20000})
    await expect(page.locator('#bizzy-quiz-0-answer-1')).toHaveText(/.*?/ , {timeout: 20000})
    await expect(page.locator('#bizzy-quiz-0-answer-2')).toHaveText(/.*?/ , {timeout: 20000})
    await expect(page.locator('#bizzy-quiz-0-answer-3')).toHaveText(/.*?/ , {timeout: 20000})

    //two buttons should be displayed
    await expect(page.locator('#next_button')).toBeDefined()
    await expect(page.locator('#previous_button')).toBeDefined()
}

test.describe.serial('E2E Test For Bizzy Quiz', () => {
    let page: any = null;
    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
      test.setTimeout(60000);
    });

    test('choose the parameters to get the questions', async () => {
        await goToBizzyQuiz(page)

        //get first parameter
        const select1 = await page.locator('button#category_select')
        await select1.click()
        await page.locator('#category_select-items-0').click()

        // get second params
        const select2 = await page.locator('button#difficulty_select')
        await select2.click()
        await page.locator('#difficulty_select-items-0').click()

        //enter third params
        const tf = await page.getByPlaceholder('Number of Questions')
        await tf.fill('13')
        expect(tf).toHaveValue(/13/)

        //click a button
        const button = await page.getByRole('button', { name: 'Start Quiz' })
        await button.click()
        await page.waitForLoadState('networkidle')

        //testing question component
        await displayQuestionComponent(page)
    });
});

