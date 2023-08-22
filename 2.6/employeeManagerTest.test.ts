import {Builder, By, Capabilities, until, WebDriver} from "selenium-webdriver";
const chromedriver = require('chromedriver');
const driver: WebDriver = new Builder().withCapabilities(Capabilities.chrome()).build();

  class employeePage {
//Locators
      driver: WebDriver;
      url: string = "https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html";
      header: By = By.css('.titleText');
      employees: By = By.css('.listContainer');
      addEmployee: By = By.css('[name="addEmployee"]');
      newEmployee: By = By.xpath('//li["@class=listText"][11]');
      nameInput: By = By.name('nameEntry');
      phoneInput: By = By.name('phoneEntry');
      titleInput: By = By.name('titleEntry');
      
// Constructor 
      constructor(driver: WebDriver) {
      this.driver = driver;
    };
// Methods 
    async navigate() {
        await this.driver.get(this.url);
        await this.driver.wait(until.elementLocated(this.header));
    };
    async click(elementBy: By) {
        await this.driver.wait(until.elementLocated(elementBy));
        return (await this.driver.findElement(elementBy)).click();
    };
    async sendKeys(elementBy: By, key: any)  {
        await this.driver.wait(until.elementLocated(elementBy));
        return this.driver.findElement(elementBy).sendKeys(key);
    };
    };
    
    const emPage = new employeePage(driver)

  describe("Employee Manger Test", () => {
      beforeEach(async () => {
          await emPage.navigate()
      });
      afterAll(async () => {
          await driver.quit()
      });
      test("adding an employee", async () => {
          await driver.wait(until.elementLocated(emPage.header));
          await driver.findElement(emPage.addEmployee).click();
          await driver.findElement(emPage.newEmployee).click();
          await driver.findElement(emPage.nameInput).click();
          await driver.findElement(emPage.nameInput).clear();
          await driver.findElement(emPage.nameInput).sendKeys("Bob Builder");
          await driver.findElement(emPage.phoneInput).click();
          await driver.findElement(emPage.phoneInput).clear();
          await driver.findElement(emPage.phoneInput).sendKeys(8018042444);
          await driver.findElement(emPage.titleInput).click();
          await driver.findElement(emPage.titleInput).clear();
          await driver.findElement(emPage.titleInput).sendKeys("Builder");
  });
  });