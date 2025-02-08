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
    await page.goto('https://152.42.139.102/login', { waitUntil: 'networkidle2' });
    
    // Take a screenshot of the login page before interaction
    await page.screenshot({ path: './frontend/public/login-page-before.png' });
    
    // Fill in the email and password fields
    await page.type('input[name="email"]', 'test@test.com');
    await page.type('input[name="password"]', 'wrongpassword');
    
    // Click the login button and wait for navigation (adjust the selector if needed)
    await Promise.all([
      page.click('button[type="submit"]'),
      //page.waitForNavigation({ waitUntil: 'networkidle2' })
    ]);
    

    // Take a screenshot after login to capture the result
    await page.screenshot({ path: './frontend/public/login-page-after.png' });
    
    await browser.close();
  }, 30000); 
});
