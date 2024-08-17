const puppeteer = require("puppeteer-core");

async function scrapeAmazon() {
  let browser;
  try {
    browser = await puppeteer.connect({
      browserWSEndpoint: `wss://brd-customer-hl_6cfb5ba0-zone-scraping_browser1:2pg1adq1ef3q@brd.superproxy.io:9222`,
    });
    const page = await browser.newPage();

    await page.setViewport({
      width: 1080,
      height: 768,
    });

    page.setDefaultNavigationTimeout(2 * 60 * 1000); // Increase timeout if needed
    await page.goto("https://www.amazon.com/s?k=laptop", {
      waitUntil: "networkidle2", // Wait until the network is idle
    });

    // Extract product titles and prices
    const products = await page.evaluate(() => {
      // Select all product cards
      const items = document.querySelector(
        "div.s-main-slot .s-result-list .s-search-results .sg-row"
      );
      console.log(items);
      //   return items.map((item) => {
      //     // Extract title
      //     const title =
      //       item.querySelector("h2 .a-text-normal")?.innerText.trim() ||
      //       "No title";
      //     // Extract price
      //     const price =
      //       item.querySelector(".a-price .a-offscreen")?.innerText.trim() ||
      //       "No price";
      //     return { title, price };
      //   });
    });

    // Print the extracted data
    console.log("Extracted Products:", products);
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await browser?.close();
  }
}

scrapeAmazon();
