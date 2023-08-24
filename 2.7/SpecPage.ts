import {WebDriver, Builder, Capabilities, until, By} from 'selenium-webdriver';

export class SpecPage {
    driver: WebDriver;
    url: string = 'https://google.com/';
    searchBar: By = By.name('q')
    results: By = By.xpath('//div[@class = "main"]');

    constructor(driver: WebDriver) {
        this.driver = driver
    }
    async navigate() {
        await this.driver.get(this.url);
        await this.driver.wait(until.elementLocated(this.searchBar));
    }
    async getText(elementBy: By) {
        await this.driver.wait(until.elementLocated(elementBy));
        return this.driver.findElement(elementBy).getText();
    }
    async getResults() {
        return this.getText(this.results)
    } 
    async sendKeys(elementBy: By, keys: any) {
        await this.driver.wait(until.elementLocated(elementBy));
        return this.driver.findElement(elementBy).sendKeys(keys);
    }
    async doSearch(searchTerm: string) {
        return this.sendKeys(this.searchBar, `${searchTerm}\n`);
    }

}