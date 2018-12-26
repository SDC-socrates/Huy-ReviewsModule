const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database');
const faker = require('faker');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/../client/dist')));

app.get('/api/turash/reviews/:id', (req, res) => {
  // Make call to our DB
  var endNumForNextSet = req.query.endNumForNextSet;
  db.getUsers(endNumForNextSet, (err, result) => {
    if (err) { throw err; }
    res.send(result);
  });
});

app.post('/api/turash/reviews/:id/addReview', (req, res) => {

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];

  const userId = faker.random.number();
  const newDate = new Date();
  const month = monthNames[newDate.getMonth()].slice(0,3);
  const date = newDate.getDate();
  const year = newDate.getFullYear();
  const dateInfo = `${month} ${date} ${year}`;

  req.body['userId'] = userId;
  req.body['dateInfo'] = dateInfo;

  db.checkExistence(req.body);
  res.sendStatus(201);
})

app.get('/api/turash/reviews/:id/reviewCount', (req, res) => {
  // Make call to our DB
  db.getReviewCount((err, result) => {
    if (err) { throw err; }
    res.json(result);
  });
});

app.listen(PORT, () => { console.log(`listening on port ${PORT}`); });
