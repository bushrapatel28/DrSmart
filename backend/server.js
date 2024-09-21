const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 6000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});