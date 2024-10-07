const router = require("express").Router();
const middleware = require("./middleware");

module.exports = () => {
  //Generates Signature
  router.post('/generate', middleware.generateToken, (req, res) => {
    res.status(200).send(res.locals.signature);
  });

  return router;
}