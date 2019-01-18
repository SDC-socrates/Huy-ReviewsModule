const Sequelize = require('sequelize');

const sequelize = new Sequelize('reviews', 'ccades', '', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,
  port: 5432,
  pool: {
    max: 1,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  benchmark: true,
});

const Reviews = sequelize.define('reviews', {
  carid: { type: Sequelize.INTEGER(8) },
  name: { type: Sequelize.STRING(50) },
  review: { type: Sequelize.STRING(250) },
  rating: { type: Sequelize.INTEGER(2) },
  date: { type: Sequelize.STRING(20) },
}, { timestamps: false });

sequelize
  .authenticate()
  .then(() => {
    console.log('CONNECTED!');
  }).catch((err) => {
    console.log('ERROR', err);
  });


sequelize.sync();

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

  const query = `INSERT INTO reviews(carid, name, review, rating, date) VALUES (${review.carid}, '${review.name}', '${review.review}', ${review.rating}, '${reviewDate}')`;

  console.log('QUERYYYYYYYY', query);

  sequelize.query(query)
    .then((res) => {
      console.log('NEW REVIEW SAVED!', res);
    })
    .catch((err) => {
      // console.log('ERROR', err);
    });
};

const getCarReviews = (submittedId, callback) => {
  const query = `select * from reviews where carid=${submittedId}`;
  sequelize.query(query)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      console.log('ERROR', err);
    });
};

const getRatingCount = (submittedId, callback) => {
  const query = `select rating from reviews where carid=${submittedId}`;
  sequelize.query(query)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      console.log('ERROR', err);
    });
};

const getReviewCount = (submittedId, callback) => {
  const query = `select count(*) from reviews where carid=${submittedId}`;
  sequelize.query(query)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      console.log('ERROR', err);
    });
};

module.exports = {
  Reviews, addNewReview, getCarReviews, sequelize, getReviewCount, getRatingCount,
};
