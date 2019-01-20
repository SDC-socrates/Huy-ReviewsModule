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
  const submittedId = req.query.id;
  postgres.getCarReviews(submittedId, (result) => {
    res.json(result.rows);
  });
});

app.get(/.+\/\d+\/ratings/, (req, res) => {
  const submittedId = req.query.id;
  postgres.getRatingCount(submittedId, (result) => {
    res.json(result);
  });
});

app.post(/.+\/\d+\/addReview/, (req, res) => {
  postgres.addNewReview(req.body);
  res.sendStatus(201);
});

app.get(/.+\/\d+\/reviewCount/, (req, res) => {
  const submittedId = req.query.id;
  postgres.getReviewCount(submittedId, (result) => {
    res.json(result);
  });
});

app.listen(PORT, () => { console.log(`listening on port ${PORT}`); });
