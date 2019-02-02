const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// app.use(express.static(path.resolve(__dirname, )))

app.use(express.json());

// console.log()

app.get('/', (req, res) => {
  res.status(200);
  res.set('Content-Type', 'text/html')
  res.sendFile(path.join(__dirname, '../index.html'));
  // res.end();
})
//Hi

module.exports = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
