const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const postgres = require('../database/cassandra.js');
const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use('/', express.static(path.join(__dirname, '/../client/dist/')));
app.use(/\/\d+\//, express.static(path.join(__dirname, '/../client/dist/')));

app.get('/api/turash/reviews/:id', (req, res) => {
  const submittedId = req.params.id;
  postgres.getCarReviews(submittedId, (result) => {
    res.json(result);
  });
});

app.get('/api/turash/reviews/:id/ratings', (req, res) => {
  // call postgres get ratings
  const submittedId = req.params.id;
  postgres.getRatingCount(submittedId, (result) => {
    res.json(result);
  });
});

app.post('/api/turash/reviews/:id/addReview', (req, res) => {
  console.log('BODYYY', req.body);
  postgres.addNewReview(req.body);
  res.sendStatus(201);
});

app.get('/api/turash/reviews/:id/reviewCount', (req, res) => {
  // Make call to our postgres
  const submittedId = req.params.id;
  postgres.getReviewCount(submittedId, (result) => {
    res.json(result);
  });
});

app.listen(PORT, () => { console.log(`listening on port ${PORT}`); });
