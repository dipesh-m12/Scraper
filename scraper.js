const puppeteer = require("puppeteer");

async function getProductData() {
  let browser;
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({
      width: 1080,
      height: 768,
    });

    page.setDefaultNavigationTimeout(2 * 60 * 1000);
    await page.goto("https://www.squirrelip.com/");
  } catch (e) {
    console.error(e);
  } finally {
    await browser?.close();
  }
}
