const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const postgres = require('../database/index.js');
const cassandra = require('../database/cassandra.js');
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

// app.get('/api/turash/reviews/:id/ratings', (req, res) => {
//   // call postgres get ratings
//   const submittedId = req.query.id;
//   postgres.getRatingCount(submittedId, (err, result) => {
//     if (err) {
//       console.log('Error in server when getting all reviews');
//     } else {
//       res.send(result);
//     }
//   });
// });

// app.post('/api/turash/reviews/:id/addReview', (req, res) => {
//   postgres.addNewUser(req.body);
//   res.sendStatus(201);
// });

// app.get('/api/turash/reviews/:id/reviewCount', (req, res) => {
//   // Make call to our postgres
//   const submittedId = req.query.id;
//   postgres.getReviewCount(submittedId, (err, result) => {
//     if (err) {
//       console.log('Err getting review count');
//     }
//     res.json(result);
//   });
// });

app.listen(PORT, () => { console.log(`listening on port ${PORT}`); });
