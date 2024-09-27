const PORT = process.env.PORT || 8001;
const express = require("express");

const app = express();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});