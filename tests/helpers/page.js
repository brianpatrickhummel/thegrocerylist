// Create Proxy Object that will access both the Puppeteer Page Object and our CustomPage Object methods

const puppeteer = require("puppeteer");
const sessionFactory = require("../factories/sessionFactory");
const userFactory = require("../factories/userFactory");

class CustomPage {
  // Generates a Puppeteer page Object
  static async build() {
    // Create a new browser object
    const browser = await puppeteer.launch({
      headless: false
    });
    const page = await browser.newPage();
    const customPage = new CustomPage(page);

    return new Proxy(customPage, {
      get: function(target, property) {
        // Proxy access to methods on all three objects
        // e.g., customPage.login(), page.goto() or browser.close()
        return customPage[property] || browser[property] || page[property];
      }
    });
  }

  constructor(page) {
    this.page = page;
  }

  async login() {
    // Generate new Mongo User Model, user id for Session Factory
    const user = await userFactory();
    // Use user id to generate Session object data
    const { session, sig } = sessionFactory(user);
    // Use Puppeteer to add cookie to our Page instance within Chromium browser
    await this.page.setCookie({ name: "session", value: session });
    await this.page.setCookie({ name: "session.sig", value: sig });
    // Refresh browser pae
    await this.page.goto("localhost:3000");
    await this.page.waitFor('a#logout[href="/api/logout"]');
  }
}

module.exports = CustomPage;
