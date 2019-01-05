var mysql = require('mysql');
const faker = require('faker');

var connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'reviews'
});

connection.connect();

// TODO: Do not allow user to update their review if
//       they already left a review

const addNewUser = function(userReview) {
  const userId = userReview.id;

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

  const newDate = new Date();
  const month = monthNames[newDate.getMonth()].slice(0,3);
  const date = newDate.getDate();
  const year = newDate.getFullYear();
  const dateInfo = `${month} ${date} ${year}`;

  var query = `insert into reviews(userId, name, review, rating, date) values ("${userId}", "${userReview.userName}", "${userReview.userReview}","${userReview.userRating}", "${dateInfo}")`;
  connection.query(query, (err) => {
    if (err) {
      console.log('Error trying to add user.');
      return;
    }
  });
}

const getUsers = function(submittedId, endNumForNextSet, callback) {

  var query = `select * from reviews where userId=${submittedId}`;
  connection.query(query, (err, result) => {
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
  connection.query(query, (err, result) => {
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
  connection.query(query, (err, result) => {
    if (err) {
      console.log('Error getting count of reviews');
      return;
    } else {
      callback(err, result);
    }
  });
}

module.exports = {
  addNewUser, getUsers, connection, getReviewCount, getRatingCount
};
