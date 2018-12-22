const faker = require('../faker.js');
const mysql = require('mysql');

var dbConnection;

beforeEach( function(done) {
  dbConnection = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'reviews'
  });
  dbConnection.connect();
  dbConnection.query('truncate ' + 'reviews', done);
});


test('should seed and retrieve data from database', async (done) => {

  faker.insertIntoDb(1, (err) => {
    if (err) { throw err; }
    var query = `select * from reviews`;
    dbConnection.query(query, (err, results) => {
      if (err) { throw err; }
      dbConnection.end();
      console.log('results', results);
      expect(Array.isArray(results)).toBe(true);
      expect(results).toHaveLength(1);
      expect(results[0]).toHaveProperty('userId', 'name', 'review', 'rating');
      done();
    });
  });
});
