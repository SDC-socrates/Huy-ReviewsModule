
var mysql = require('mysql');

var connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'reviews'
});

connection.connect();

// TODO: Do not allow user to update their review if
//       they already left a review
const addNewUser = function(id, name, review, rating) {
  var query = `insert ignore into reviews(id, name, review, rating) values ("${id}", "${name}", "${review}","${rating}")`;
  connection.query(query, (err) => {
    if (err) { throw err; }
    // console.log("Added To DB");
  });
}

module.exports = {
  addNewUser
};