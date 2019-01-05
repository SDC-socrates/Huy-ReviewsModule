const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, '/../client/dist/')));
app.use(/\/\d+\//, express.static(path.join(__dirname, '/../client/dist/')));

app.get('/api/turash/reviews/:id', (req, res) => {
  // Make call to our DB
  var endNumForNextSet = req.query.endNumForNextSet;
  var submittedId = req.query.id;
  db.getUsers(submittedId, endNumForNextSet, (err, result) => {
    if (err) {
      console.log('Error in server when getting all users');
      return;
    }
    res.send(result);

  });
});

app.get('/api/turash/reviews/:id/ratings', (req, res) => {
  // call db get ratings
  var submittedId = req.query.id;
  db.getRatingCount( submittedId, (err, result) => {
    if (err) {
      console.log('Error in server when getting all reviews');
      return;
    } else {
      res.send(result);
    }
  })
});

app.post('/api/turash/reviews/:id/addReview', (req, res) => {
  db.addNewUser(req.body);
  res.sendStatus(201);
})

app.get('/api/turash/reviews/:id/reviewCount', (req, res) => {
  // Make call to our DB
  var submittedId = req.query.id;
  db.getReviewCount(submittedId, (err, result) => {
    if (err) {
      console.log("Err getting review count");
    }
    res.json(result);
  });
});

app.listen(PORT, () => { console.log(`listening on port ${PORT}`); });
