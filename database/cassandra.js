const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'reviews' });

const addNewReview = (review) => {
  let reviewDate = null;

  if (review.date === null) {
    const monthNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const newDate = new Date();
    const month = monthNames[newDate.getMonth()];
    const date = newDate.getDate();
    const year = newDate.getFullYear();
    const dateInfo = `${month}/${date}/${year}`;
    reviewDate = dateInfo;
  }

  const query = `INSERT INTO reviews(carid, name, review, rating, date) VALUES (${review.carid}, $$${review.name}$$, $$${review.review}$$, ${review.rating}, $$${reviewDate}$$)`;

  client.execute(query)
    .then((res) => {
      console.log('NEW REVIEW SAVED!', res);
    })
    .catch((err) => {
      // console.log('ERROR', err);
    });
};

const getCarReviews = (submittedId, callback) => {
  const query = `select * from reviews where carid=${submittedId} ALLOW FILTERING`;
  client.execute(query)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      console.log('ERROR', err);
    });
};

const getRatingCount = (submittedId, callback) => {
  const query = `select rating from reviews where carid=${submittedId}`;
  client.execute(query)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      console.log('ERROR', err);
    });
};

const getReviewCount = (submittedId, callback) => {
  const query = `select count(*) from reviews where carid=${submittedId}`;
  client.execute(query)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      console.log('ERROR', err);
    });
};


module.exports = {
  client, addNewReview, getCarReviews, getReviewCount, getRatingCount,
};
