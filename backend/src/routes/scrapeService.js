const axios = require('axios');
const cheerio = require('cheerio');

const scrapeArticles = async (diagnosis) => {
  try {
    // Replace this URL with a relevant medical site or resource
    const url = `https://example-health-site.com/search?q=${diagnosis}`;

    // Fetch the HTML content from the website
    const { data } = await axios.get(url);
    
    // Load HTML into Cheerio
    const $ = cheerio.load(data);

    // Extract the articles or content
    let articles = [];
    $('article h2').each((i, element) => {
      const title = $(element).text();
      const link = $(element).parent().attr('href'); // Assuming <a> tag contains the link
      
      // Push the title and link to the articles array
      articles.push({ title, link });
    });

    return articles;
  } catch (error) {
    console.error('Error scraping articles:', error);
    return [];
  }
};

module.exports = scrapeArticles;
