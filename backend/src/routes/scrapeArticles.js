const puppeteer = require('puppeteer');

const scrapeArticles = async (diagnosis) => {
  try {
    // Launch Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the target page with the given diagnosis
    const url = `https://www.webmd.com/search?q=${diagnosis}+symptoms`;
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Evaluate the page and extract article titles, links, and descriptions
    const articles = await page.evaluate(() => {
      let results = [];
      const items = document.querySelectorAll('.search-results-item');

      items.forEach((item, index) => {
        if (index < 4) {
          const titleElement = item.querySelector('.search-results-title a');
          const descriptionElement = item.querySelector('.search-results-description');
          const title = titleElement ? titleElement.innerText : '';
          const link = titleElement ? titleElement.href : '';
          const description = descriptionElement ? descriptionElement.innerText : '';
          if (title && link) {
            results.push({ title, link, description });
          }
        }
      });
      console.log("Result array from puppeteer: ", results);
      return results;
    });

    // Close the browser
    await browser.close();
    console.log("Articles Array: ", articles);
    return articles;

  } catch (error) {
    console.error('Error scraping articles with Puppeteer:', error);
    return [];
  }
};

module.exports = scrapeArticles;
