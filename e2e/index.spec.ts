import {test, expect} from '@playwright/test'

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
    await expect(page.locator('#next_button')).toBeDisabled()
    await expect(page.locator('#previous_button')).toBeDisabled()
}

const takeQuizz = async (page: any, length: number) => {
    let i = 0;
    while (i < length - 1) {
        await expect(page.locator(`#bizzy-quiz-${i}-title`)).toHaveText(/.*?/ , {timeout: 20000})
        const randomNO: number = Math.floor(Math.random() * 4);
        await page.locator(`#bizzy-quiz-${i}-answer-${randomNO}`).click();
        await expect(page.locator('#next_button')).not.toBeDisabled()
        await page.locator('#next_button').click();
        i++;
    }
    //submit final answer
    if(i + 1 === length) {
        await expect(page.locator(`#bizzy-quiz-${i}-title`)).toHaveText(/.*?/ , {timeout: 20000})
        const randomNO: number = Math.floor(Math.random() * 4);
        await page.locator(`#bizzy-quiz-${i}-answer-${randomNO}`).click();
        await expect(page.locator('#submit_button')).not.toBeDisabled()
        await page.locator('#submit_button').click();
    }
}

test.describe.serial('E2E Test For Bizzy Quiz', () => {
    let page: any = null;
    const quizLength: number = 13;
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
        await tf.fill(`${quizLength}`)
        expect(tf).toHaveValue(/13/)

        //click a button
        const button = await page.getByRole('button', { name: 'Start Quiz' })
        await button.click()
        await page.waitForLoadState('networkidle')

        //testing question component
        await displayQuestionComponent(page)
    });

    test('take the quizz by selecting random answers and submit the answers' , async () => {
        //take quizz
        await takeQuizz(page,quizLength)

        await page.getByTestId('success-title').waitFor()
        await expect(page.getByRole('button', { name: 'Retake Quiz' })).toBeDefined()
    })

    test('Retake button to retake quiz', async () => {
        await page.getByRole('button', { name: 'Retake Quiz'}).click()

        await expect(page.locator('#difficulty_select')).toBeDefined()
        await expect(page.locator('#category_select')).toBeDefined()
    })
});

