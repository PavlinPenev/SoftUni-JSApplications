import { expect } from "chai";
import { chromium } from "playwright";
import { bookCollection } from "./BookCollectionMock.js";

const appUrl = 'http://127.0.0.1:5500/Architecture%20And%20Testing%20-%20Exercise/02.Book-Library/index.html';

describe('Book Library Tests', async function () {

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

    it('loads the books', async () => {

        await page.route('**/jsonstore/collections/books', (route, request) => {

            route.fulfill({

                body: JSON.stringify(bookCollection),
                headers: {

                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"

                },
                status: 200

            })

        })

        await page.goto(appUrl);

        await page.click('text=load all books');
        await page.waitForSelector('text=Harry Potter');

        const data = await page.$$eval('tbody tr', trs => trs.map(tr => tr.textContent));

        expect(data[0]).contains('Harry Potter');
        expect(data[0]).contains('J.K.');
        expect(data[1]).contains('C#');
        expect(data[1]).contains('Svetlin');
    })

    it('alerts when empty fields are tried to be passed to post crud', async () => {

        await page.goto(appUrl);

        await page.waitForSelector('text=form');
        await page.fill('[name="author"]', '');
        await page.fill('[name="title"]', 'asd');

        await page.click('text=submit');
        await page.click('text=load all books');

        await page.waitForSelector('text=Harry Potter');

        page.on('dialog', (dialog) => {

            expect(dialog.message).to.equal('All fields are required!');
            dialog.accept();

        });

    })

    it('posts a book(crud)', async () => {

        await page.goto(appUrl);

        await page.fill('input[name="author"]', "asd");
        await page.fill('input[name="title"]', "gfds");
        let tappedRequest;

        page.on("request", (request) => (tappedRequest = request));
        await page.click("text=Submit");

        expect(tappedRequest.method()).to.equal("POST");
        expect(tappedRequest.postDataJSON()).to.own.include({ author: "asd" });
        expect(tappedRequest.postDataJSON()).to.own.include({ title: "gfds" });
        expect(await tappedRequest.allHeaders()).to.have.property("content-type");
        expect(await tappedRequest.headerValue("content-type")).to.equal("application/json");

    })

    it('edits book', async () => {

        await page.goto(appUrl);

        await page.click('text=load all books');
        await page.click('text=edit');

        expect(await page.isVisible('#editForm')).to.be.true;

        let inputValues = await page.$$eval('#editForm input', e => e.map(input => input.value));
        expect(inputValues[1]).to.contains('Harry Potter');
        expect(inputValues[2]).to.contains('J.K.Rowling');

        await page.fill('#editForm input[name="author"]', 'az');
        await page.click('text=save');
        await page.click('text=load all books');

        inputValues = await page.$eval('tbody tr', e => e.textContent);
        expect(inputValues).to.contains('Harry Potter');
        expect(inputValues).to.contains('az');
    })

    it('deletes book', async () => {

        await page.goto(appUrl);

        await page.click('text=load all books');
        await page.click('text=delete');
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).to.equal("Are you sure you want to delete this book?");
            dialog.accept();
            await page.click('text=load all books');

            const rowValues = await page.$eval('tbody tr', e => e.textContent);
            expect(rowValues).to.not.contains('Harry Potter');
            expect(rowValues).to.not.contains('J.K.Rowling');
        });

    })

})