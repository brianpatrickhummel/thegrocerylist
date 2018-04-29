// Testing User Authentication

// CustomPageClass
const Page = require("./helpers/page");

let page;

beforeEach(async () => {
  // Call Static method on our CustomPage Class
  page = await Page.build();

  // really = customPage.goto() > Proxy > Puppeteer's page.goto()
  page.goto("localhost:3000");
  await Promise.race([
    page.waitForNavigation({ waitUntil: "load" }),
    page.waitForNavigation({ waitUntil: "networkidle0" })
  ]);
});

afterEach(async () => {
  // really = customPage.close() > Proxy > Puppeteer's browser.close()
  await page.close();
});

test("clicking Google Login starts Google OAuth flow", async () => {
  await page.click(".share-toggle-button");
  await page.waitFor(1000);
  await page.click("a#google");
  // Assertions
  const url = await page.url();
  expect(url).toMatch(/accounts\.google\.com/);
});

test("clicking Twitter Login starts Twitter authentication", async () => {
  await page.click(".share-toggle-button");
  await page.waitFor(1000);
  await page.click("a#twitter");

  // Assertions
  const url = await page.url();
  expect(url).toMatch(/api\.twitter\.com\/oauth/);
});

test("clicking Facebook Login starts Facebook authentication", async () => {
  await page.click(".share-toggle-button");
  await page.waitFor(1000);
  await page.click("a#facebook");
  // Assertions
  const url = await page.url();
  expect(url).toMatch(/www.facebook.com\/login/);
});

test("clicking Github Login starts Github authentication", async () => {
  await page.click(".share-toggle-button");
  await page.waitFor(1000);
  await page.click("a#github");
  // Assertions
  const url = await page.url();
  expect(url).toMatch(/github.com\/login/);
});

test("when signed in, url redirect to /preferences/0 occurs", async () => {
  // really = customPage.login()
  await page.login();
  // Assertions
  const url = await page.url();
  expect(url).toMatch(/localhost:3000\/preferences\/0/);
});

test("user has logged out", async () => {
  // really = customPage.login()
  await page.login();
  // Assertions
  await page.goto("localhost:3000");
  await page.waitFor(1000);
  await page.click("a#logout");
  await page.waitFor(2000);
  let loginButton = await page.$(".share-toggle-button");
  // If login button exists on page, user is logged out
  expect(loginButton === null).toBeFalsy();
});
