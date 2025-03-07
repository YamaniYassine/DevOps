const puppeteer = require('puppeteer');

describe('Login Page Interaction and Screenshot', () => {
  it('should login and take a screenshot of the result', async () => {
    // Launch browser in headless mode
    const browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      headless: true
    });
    const page = await browser.newPage();

    // Navigate to the login page
    await page.goto('https://152.42.139.102/login', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    // Take a screenshot before interaction
    await page.screenshot({ path: './frontend/public/login-page-before.png' });

    // Fill in the email and password fields
    await page.type('input[name="email"]', 'employe@test.com');
    await page.type('input[name="password"]', 'employee');

    // Click the login button
    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }) // Wait for the page to load
    ]);

    // Determine successful login by checking the redirected page
    const url = await page.url();
    console.log("Current URL after login:", url);

    // Wait for the correct dashboard based on role
    if (url.includes("employee-dashboard")) {
      await page.waitForXPath("//h6[contains(text(), 'Bienvenue sur le tableau de bord des employés')]", { timeout: 60000 });
    } else if (url.includes("dashboard")) {
      await page.waitForXPath("//h6[contains(text(), 'tableau de bord')]", { timeout: 30000 });
    } else {
      await page.waitForXPath("//h6[contains(text(), 'Bienvenue')]", { timeout: 30000 });
    }

    // Take a screenshot after login
    await page.screenshot({ path: './frontend/public/login-page-after.png' });

    await browser.close();
  }, 90000);
});
