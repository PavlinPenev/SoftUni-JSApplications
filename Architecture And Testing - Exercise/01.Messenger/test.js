import { expect } from "chai";
import { chromium } from "playwright";

const appUrl = 'http://127.0.0.1:5500/Architecture%20And%20Testing%20-%20Exercise/01.Messenger/index.html';

describe('Messenger Tests Setup', async function () {

    this.timeout(6000);

    let browser, page;

    before(async () => {

        browser = await chromium.launch();

    })

    after(async () => {

        await browser.close();

    })

    beforeEach(async () => {

        page = await browser.newPage();

    })

    afterEach(async () => {

        await page.close();

    })

    it('loads books', async () => {

        await page.goto(appUrl);

        await page.click('text=refresh');

        const text = await page.inputValue('#messages');

        expect(text).to.contains(`Spami: Hello, are you there?
Garry: Yep, whats up :?
Spami: How are you? Long time no see? :)
George: Hello, guys! :))
Spami: Hello, George nice to see you! :)))`)

    })

    it('posts message', async () => {

        await page.goto(appUrl);

        await page.fill('#author', 'Viki Badema');
        await page.fill('#content', 'Dai si badema na koito iskash ti! Az moq ne go davam :D');

        const [response] = await Promise.all([
            page.waitForResponse(response => response.url().includes('/jsonstore/messenger')),
            page.click('text=send')
        ]);
        expect(response.ok()).to.be.true;
        expect(await response.json()).to.contains({ author: 'Viki Badema', content: 'Dai si badema na koito iskash ti! Az moq ne go davam :D' });
    })
})