const faker = require('../faker.js');
const db = require('../database/index.js')
const mysql = require('mysql');

var dbConnection;

beforeEach( function() {
  dbConnection = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'reviews'
  });
  dbConnection.connect();
});

afterEach(function(done) {
  dbConnection.query('truncate ' + 'reviews', done);
  dbConnection.end();
});


test('should seed and retrieve data from database', async (done) => {
  faker.insertIntoDb(1);
  var query = `select * from reviews`;
  dbConnection.query(query, (err, results) => {
    if (err) { throw err; }
    console.log('results', results);
    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(1);
    expect(results[0]).toHaveProperty('userId', 'name', 'review', 'rating');
    done();
  });
});
