const {languageFO} = require('../selectors/FO/index');
const exec = require('child_process').exec;
const puppeteer = require('puppeteer');
let path = require('path');
let fs = require('fs');
let pdfUtil = require('pdf-to-text');

let options = {
  timeout: 30000,
  headless: false,
  defaultViewport: {
    width: 0,
    height: 0
  },
  desiredCapabilities: {
    browserName: 'chrome',
  },
  args: [`--window-size=${1280},${1024}`]
};
global.tab = [];
global.isOpen = false;
global.param = [];

class CommonClient {
  async open() {
    global.browser = await puppeteer.launch(options);
    global.page = await this.getPage(0)
  }

  async getPage(id) {
    const pages = await browser.pages();
    return await pages[id];
  }

  async localhost(link) {
    await page.goto(link + '/install-dev');
  }

  async waitAndSelectByValue(selector, value, wait = 0) {
    await page.waitFor(wait);
    await page.waitFor(selector);
    await page.select(selector, value);
  }

  async waitForVisibleAndClick(selector, wait = 0) {
    await page.waitFor(wait);
    await page.waitFor(selector, {visible: true});
    await page.click(selector);
  }

  async waitForExistAndClick(selector, wait = 0) {
    await page.waitFor(wait);
    await page.waitFor(selector);
    await page.click(selector);
  }

  async isVisible(selector, wait = 0, options = {}) {
    await page.waitFor(wait, options);
    global.isVisible = await page.$(selector) !== null;
  }

  async pause(timeoutOrSelectorOrFunction, options = {}) {
    await page.waitFor(timeoutOrSelectorOrFunction, options);
  }

  async screenshot(fileName = 'screenshot') {
    await page.screenshot({path: 'test/screenshots/' + fileName + global.dateTime + '.png'});
  }


  async stopTracing() {
    await page.tracing.stop();
  }

  async startTracing(testName = 'test') {
    await page.tracing.start({
      path: 'test/tracing/' + testName + '.json',
      categories: ['devtools.timeline']
    });
  }

  async waitAndSetValue(selector, value, wait = 0, options = {}) {
    await page.waitFor(wait);
    await page.waitFor(selector, options);
    await page.click(selector);
    await page.keyboard.down('Control');
    await page.keyboard.down('A');
    await page.keyboard.up('A');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await page.type(selector, value);
  }

  async waitForVisible(selector, wait = 0, options = {visible: true}) {
    await page.waitFor(wait);
    await page.waitFor(selector, options);
  }

  async close() {
    await browser.close();
  }

  async isExisting(selector, wait = 0) {
    await page.waitFor(wait);
    const exists = await page.$(selector) !== null;
    expect(exists).to.be.true;
  }

  async signInFO(selector, link = global.URL) {
    await page.goto(link);
    await page._client.send('Emulation.clearDeviceMetricsOverride');
    await this.waitForExistAndClick(selector.sign_in_button, 1000);
    await this.waitAndSetValue(selector.login_input, 'pub@prestashop.com');
    await this.waitAndSetValue(selector.password_inputFO, '123456789');
    await this.waitForExistAndClick(selector.login_button);
    await this.waitForExistAndClick(selector.logo_home_page);
  }
}

module.exports = CommonClient;
