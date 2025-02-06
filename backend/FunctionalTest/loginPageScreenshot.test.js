const puppeteer = require('puppeteer');

describe('Login Page Screenshot', () => {
  it('should capture a screenshot of the login page', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://152.42.139.102/login', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'login-page.png' });
    await browser.close();
  });
});
