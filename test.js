const { By, Builder, until } = require('selenium-webdriver');
const assert = require('assert');
require('geckodriver');

const credentials = [
  { Phone: '+251947742149', password: 'Beti124@' },
  { Phone: '+251947742149', password: 'Beti134@' },
  { Phone: '+251947742149', password: 'Beti2000034@' },
  { Phone: '+251947742149', password: 'Beti1234@' },
  { Phone: '+2519472149', password: 'Beti1234@' },
  { Phone: '+251924384865', password: '12345678Tati@' },
  { Phone: '+251947742149', password: 'Beti14@' },
];

describe('login testing using Mocha', () => {
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser('firefox').build();
  });

  afterEach(async () => {
    console.log('This will be executed after each test');
    await driver.quit();
  });

  credentials.forEach((credential, index) => {
    it(`login test - Combination ${index + 1}`, async () => {
      try {
        await driver.get('https://dagusms.com/auth/login');

        const Phone = await driver.findElement(By.css("input[data-variant='default'][placeholder='+2519********']"));
        await Phone.sendKeys(credential.Phone);

        const password = await driver.findElement(By.css("input.m-f2d85dd2.mantine-PasswordInput-innerInput[placeholder='*********']"));
        await password.sendKeys(credential.password);

        const login = await driver.findElement(By.css("span.m-811560b9.mantine-Button-label"));
        await login.click();

        const dashboardLink = await driver.wait(until.elementLocated(By.xpath('/html/body/div[2]/div/main/div[1]/div/div/p')), 5000);
        const result = await dashboardLink.getAttribute('innerText');
        console.log(result, " tati")

        assert.strictEqual(result, 'Dashboard', `Login was successful for ${credential.Phone}`);
      } catch (error) {
        console.error(`Error in test for combination ${index + 1}:`, error);
        throw error;
      }
    });
  });
});
