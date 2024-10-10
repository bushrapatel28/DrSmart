// const puppeteer = require('puppeteer');

// const scrapeImage = async (diagnosis) => {
//   try {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     // Search Google Images with the diagnosis
//     const url = `https://www.google.com/search?tbm=isch&q=${diagnosis}`;
//     await page.goto(url, { waitUntil: 'networkidle2' });

//     // Scrape the first image's URL
//     const imageUrl = await page.evaluate(() => {
//       const firstImageElement = document.querySelector('img');
//       return firstImageElement ? firstImageElement.src : null;
//     });

//     // Close the browser
//     await browser.close();
//     console.log("Articles Image: ", imageUrl);
//     return imageUrl;
//   } catch (error) {
//     console.error('Error scraping image from Google:', error);
//     return null;
//   }
// };

// module.exports = scrapeImage;
const puppeteer = require('puppeteer');

const scrapeImage = async (diagnosis) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const url = `https://unsplash.com/s/photos/${diagnosis}`;
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Scrape the second image's 600w URL from the srcset
    const imageUrl = await page.evaluate(() => {
      const imageElements = document.querySelectorAll('figure img');
      if (imageElements.length > 1) {
        const secondImageElement = imageElements[1]; 
        const srcset = secondImageElement.getAttribute('srcset');
        console.log("srcset: ", srcset);
        if (srcset) {
          // Find the URL corresponding to 600w
          const srcArray = srcset.split(',').map(src => src.trim());
          const src600w = srcArray.find(src => src.includes('1000w'));
          return src600w ? src600w.split(' ')[0] : null; 
        }
      }
      return null;
    });

    await browser.close();
    console.log("Articles Image (600w):", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error('Error scraping image from Unsplash:', error);
    return null;
  }
};

module.exports = scrapeImage;

