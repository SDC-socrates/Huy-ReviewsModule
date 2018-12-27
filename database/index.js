
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

// Refactor this accept an object
const addNewUser = function(userId, name, review, rating, date) {
  var query = `insert ignore into reviews(userId, name, review, rating, date) values ("${userId}", "${name}", "${review}","${rating}", "${date}")`;
  connection.query(query, (err) => {
    if (err) { throw err; }
    // console.log("Added To DB");
  });
}

// TODO: Function to fetch for a single specific review
const getUsers = function(endNumForNextSet, callback) {
  var query = `select count(*) from reviews`;

  connection.query(query, (err, result) => {
    if (err) { throw err; }
    console.log('COUNT ISSSSS ', result[0]['count(*)']);
    var count = result[0]['count(*)']
    var query = `select * from reviews where id > ${count - endNumForNextSet} and id <= ${count}`;
    connection.query(query, (err, result) => {
      if (err) { throw err; }
      callback(err, result);
    });
  });
}

const getReviewCount = function(callback) {
  var query = `select count(*) from reviews`;
  connection.query(query, (err, result) => {
    if (err) { throw err; }
    callback(err, result);
  });
}

const checkExistence = function(userReview) {
  const userId = faker.random.number();
  var query = `SELECT EXISTS(SELECT * FROM reviews WHERE userId = ${userId})`;

  connection.query(query, (err, result) => {
    console.log('result is', );
    if (result[0][`EXISTS(SELECT * FROM reviews WHERE userId = ${userId})`] === 0) {

      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

      const newDate = new Date();
      const month = monthNames[newDate.getMonth()].slice(0,3);
      const date = newDate.getDate();
      const year = newDate.getFullYear();
      const dateInfo = `${month} ${date} ${year}`;

      // userReview['userId'] = userId;
      // userReview['date'] = dateInfo;

      console.log('userReview', userReview);
      addNewUser(userId, userReview.userName, userReview.userReview, userReview.userRating , dateInfo);
    } else {
      checkExistence(userReview);
    }
  });




}


module.exports = {
  addNewUser, getUsers, connection, getReviewCount, checkExistence
};
