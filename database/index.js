const Sequelize = require('sequelize');
const fs = require('fs');

let sequelizeLog = '';
const logToSequelizeLog = (executedQuery, executionTime) => {
  console.log(executedQuery);
  console.log(`Executed in: ${executionTime}ms.`);
  sequelizeLog += `${executionTime}\n`;
  fs.writeFileSync('./queryTimes.csv', sequelizeLog);
};

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
  logging: logToSequelizeLog,
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
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const newDate = new Date();
    const month = monthNames[newDate.getMonth()].slice(0, 3);
    const date = newDate.getDate();
    const year = newDate.getFullYear();
    const dateInfo = `${month} ${date} ${year}`;
    reviewDate = dateInfo;
  }

  const query = `INSERT INTO reviews(id, carid, name, review, rating, date) VALUES ("${review.id}", "${review.carid}", "${review.name}", "${review.review}","${review.rating}", "${reviewDate}")`;

  sequelize.query(query, (err) => {
    if (err) {
      console.log('Error trying to add user into database.');
    }
  });
};

const getCarReviews = (submittedId, callback) => {
  const query = `select * from reviews where carid=${submittedId}`;
  sequelize.query(query)
    .then((res) => {
      console.log('RESULT', res);
      callback(res);
    })
    .catch((err) => {
      console.log('ERROR', err);
    });
};

const getRatingCount = (submittedId, callback) => {
  const query = `select rating from reviews where carid=${submittedId}`;
  sequelize.query(query, (err, result) => {
    if (err) {
      console.log('Error getting ratings');
    } else {
      callback(err, result);
    }
  });
};

const getReviewCount = (submittedId, callback) => {
  const query = `select count(*) from reviews where carid=${submittedId}`;
  sequelize.query(query, (err, result) => {
    if (err) {
      console.log('Error getting count of reviews');
    } else {
      callback(err, result);
    }
  });
};

module.exports = {
  Reviews, addNewReview, getCarReviews, sequelize, getReviewCount, getRatingCount,
};
