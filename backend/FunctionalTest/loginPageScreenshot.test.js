const puppeteer = require('puppeteer');

describe('Login Page Interaction and Screenshot', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: 'new',
      ignoreHTTPSErrors: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
    await page.setDefaultNavigationTimeout(60000);
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should complete login flow and capture screenshots', async () => {
    try {
      // Étape 1: Chargement de la page de login
      await page.goto('https://152.42.139.102/login', {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // Screenshot avant interaction
      await page.screenshot({ path: './frontend/public/login-page-before.png' });

      // Étape 2: Remplissage du formulaire
      await page.waitForSelector('input[name="email"]', { visible: true });
      await page.type('input[name="email"]', 'employe@test.com');
      
      await page.waitForSelector('input[name="password"]', { visible: true });
      await page.type('input[name="password"]', 'employee');

      // Screenshot après remplissage
      await page.screenshot({ path: './frontend/public/login-filled.png' });

      // Étape 3: Soumission du formulaire
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 30000 }),
        page.click('button[type="submit"]')
      ]);

      // Étape 4: Vérification de la redirection
      await page.waitForSelector('.dashboard', { timeout: 15000 }); // Sélecteur de la page de destination

      // Screenshot après connexion
      await page.screenshot({ path: './frontend/public/login-page-after.png' });

    } catch (error) {
      // Capture d'erreur avec screenshot
      await page.screenshot({ path: './frontend/public/login-error.png' });
      throw error;
    }
  }, 90000); // Timeout global à 90s
});