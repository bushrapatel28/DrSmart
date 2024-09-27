const router = require("express").Router();

module.exports = db => {
  router.get("/appointments", (req, res) => {
    const protocol = req.protocol;
    const host = req.hostname;
    const port = process.env.PORT || 8001;
    const serverUrl = `${protocol}://${host}:${port}`;

    db.query(`
      
    `).then(({ rows }) => {
      response.json(rows[0]);
    });
  });

  return router;
}