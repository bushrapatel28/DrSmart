const router = require("express").Router();
const cheerio = require('cheerio');

module.exports = db => {
  router.get("/scrape", async (req, res) => {  // Mark the route handler as async
    const { diagnosis } = req.query;
    console.error('*********** Fetch req to the backend ************');

    if (!diagnosis) {
      return res.status(400).send({ message: 'Diagnosis is required' });
    }

    try {
      // Call the scraping service and await the result
      const articles = await scrapeArticles(diagnosis);
      
      // Send the scraped articles as the response
      res.status(200).json(articles);
    } catch (error) {
      console.error('Error scraping articles:', error);
      res.status(500).json({ message: 'Error scraping articles' });
    }
  });

  return router;
}