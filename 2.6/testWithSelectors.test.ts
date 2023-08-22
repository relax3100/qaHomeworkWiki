import {Builder, By, Capabilities, WebDriver, until} from "selenium-webdriver"
const chromedriver = require("chromedriver")
const driver: WebDriver = new Builder().withCapabilities(Capabilities.chrome()).build();

class enterWanted {
    hdrInput: By = By.css('[name="hdrInput"]');
    mkeInput: By = By.css('[name="mkeInput"]');
    oaiInput: By = By.css('[name="oriInput"]');
    nameInput: By = By.css('[name="namInput"]');
    clrBtn: By = By.id('clearBtn');
    errorMsg: By = By.css("#validHeader");
    submitBtn: By = By.id('saveBtn');
    driver: WebDriver;
    url: string = "https://devmountain-qa.github.io/enter-wanted/1.4_Assignment/index.html";
    header: By = By.css('.titleText');

    constructor(driver: WebDriver) {
        this.driver = driver;
    };
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
const entWanted = new enterWanted(driver)

describe("Filling in the blanks", () => {
    beforeEach(async () => {
        await driver.get('https://devmountain-qa.github.io/enter-wanted/1.4_Assignment/index.html')
    });
    afterAll(async () => {
        await driver.quit();
    });
    
    test("filling in the blanks for real", async () => {
        await driver.findElement(entWanted.hdrInput).sendKeys("This")
        await driver.findElement(entWanted.mkeInput).sendKeys("That")
        await driver.findElement(entWanted.oaiInput).sendKeys(23131254)
        await driver.findElement(entWanted.nameInput).sendKeys("john doe")
        await driver.findElement(entWanted.submitBtn).click()
        let errorText = await driver.findElement(entWanted.errorMsg).getText()
        expect(errorText).toContain("Errors Received:")
        await driver.findElement(entWanted.clrBtn).click()
        
    });
});