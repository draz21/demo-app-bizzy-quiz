import {test, expect} from '@playwright/test'

test.describe.serial('E2E Test For Bizzy Quiz', () => {
    let page: any = null;
    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
      test.setTimeout(60000);
    });

    const goToBizzyQuiz = async(page: any) => {
        await page.goto('http://localhost:3000/');  

        await page.waitForURL('http://localhost:3000/');

        await page.locator('img#empty_image').waitFor()
    }

    test('choose the parameters to get the questions', async () => {
        await goToBizzyQuiz(page)
    });
});

