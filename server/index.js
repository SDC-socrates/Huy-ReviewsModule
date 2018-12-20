const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '../client/dist/index.html'));

app.get("/api/turash/reviews", (req,res) => {
  // Make call to our DB
  db.getAllUsers( (err, result) => {
    if (err) { throw err; }
    res.json(result);
  })
});

app.listen(PORT, () => {console.log(`listening on port ${PORT}`)} );