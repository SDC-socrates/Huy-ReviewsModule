const Sequelize = require('sequelize');

const sequelize = new Sequelize('reviews', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize.authenticate().then(() => {
  console.log('CONNECTED!');
  const Reviews = sequelize.define('reviews', {
    id: { type: Sequelize.INTEGER },
    carid: { type: Sequelize.INTEGER },
    name: { type: Sequelize.STRING },
    review: { type: Sequelize.STRING },
    rating: { type: Sequelize.INTEGER },
    date: { type: Sequelize.STRING },
  });

  Reviews.sync({ force: true }).then(() => {
    Reviews.create({

    });
  });
}).catch((err) => {
  console.log('ERROR', err);
});

// TODO: Do not allow user to update their review if
//       they already left a review

const addNewUser = function(userReview) {
  // const userId = userReview.userId;

  if (userReview.userReviewDate === null) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    const newDate = new Date();
    const month = monthNames[newDate.getMonth()].slice(0,3);
    const date = newDate.getDate();
    const year = newDate.getFullYear();
    const dateInfo = `${month} ${date} ${year}`;
    userReview.userReviewDate = dateInfo;
  }


  var query = `insert into reviews(carId, name, review, rating, date) values ("${userReview.carId}", "${userReview.userName}", "${userReview.userReview}","${userReview.userRating}", "${userReview.userReviewDate}")`

  sequelize.query(query, (err) => {
    if (err) {
      console.log('Error trying to add user into database.');
      return;
    }
  });
}

const getUsers = function(submittedId, endNumForNextSet, callback) {

  var query = `select * from reviews where userId=${submittedId}`;
  sequelize.query(query, (err, result) => {
    if (err) {
      console.log('Error retrieving 15 records');
      return;
    } else {
      callback(err, result);
    }
  });
}

const getRatingCount = function(submittedId, callback) {
  var query = `select rating from reviews where userId=${submittedId};`
  sequelize.query(query, (err, result) => {
    if (err) {
      console.log('Error getting ratings');
      return;
    } else {
      callback(err, result);
    }
  });
}

const getReviewCount = function(submittedId, callback) {
  var query = `select count(*) from reviews where userId=${submittedId}`;
  sequelize.query(query, (err, result) => {
    if (err) {
      console.log('Error getting count of reviews');
      return;
    } else {
      callback(err, result);
    }
  });
}

module.exports = {
  addNewUser, getUsers, sequelize, getReviewCount, getRatingCount,
};
