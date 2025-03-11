import { chai, puppeteer } from './test-setup.js';
const { expect } = chai;

// Rest of your test code...


(async () => {
    describe('End-to-End Tests', () => {
        let browser;
        let page;

        before(async () => {
            browser = await puppeteer.launch();
            page = await browser.newPage();
        });

        after(async () => {
            await browser.close();
        });

        it('should display login page', async () => {
            await page.goto('http://localhost:3000/login.html');
            const pageTitle = await page.title();
            expect(pageTitle).to.equal('Login Page');
        });

        it('should login successfully and redirect to home page', async () => {
            await page.goto('http://localhost:3000/login.html');
            await page.type('input[name="email"]', 'serge@utrains.com');
            await page.type('input[name="password"]', 'abc123');
            await Promise.all([
                page.waitForNavigation(), // Wait for navigation to complete
                page.click('button[type="submit"]') // Click the login button
            ]);
            const pageTitle = await page.title();
            expect(pageTitle).to.equal('Home Page');
        });

        it('should display home page', async () => {
            await page.goto('http://localhost:3000/home.html');
            const pageTitle = await page.title();
            expect(pageTitle).to.equal('Home Page');
        });
    });
})();
