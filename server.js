// Import Express.
const express = require('express');
// Import path module.
const path = require('path');
// Create new instance of express.
const app = express();
// Set post where server will listen.
const PORT = process.env.PORT || 3000;
// Setup node fetch
const fetch = require('node-fetch');
// Set up cors
const cors = require('cors');
// Set up middleware
app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(express.static(path.join(__dirname, 'public')))
  .use(cors({
    origin: 'http://127.0.0.1:5501'
  }))
// Get route for API deals
app.get('/deals', (req, res) => {
const cheapSharkUrl = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&sortBy=Metacritic&desc=0&onSale=1';
fetch(cheapSharkUrl)
    .then(response => response.json())
    .then(data => {
    //   console.log(data);
      res.json(data); // Send data back to frontend
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    });
});
// Set up express server.
app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
