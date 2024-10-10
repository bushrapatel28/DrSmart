const router = require("express").Router();
const middleware = require("./token-generator");

module.exports = () => {
  //Generates Signature
  router.post('/generate', middleware.generateToken, (req, res) => {
    res.status(200).json({signature: res.locals.signature});
  });

  return router;
}

