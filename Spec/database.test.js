const faker = require('../faker.js');
const mysql = require('mysql');
const request = require('request');

var dbConnection;

beforeEach( function(done) {
  dbConnection = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'reviews'
  });
  // dbConnection.connect();
  dbConnection.query('truncate ' + 'reviews', done);
});

// afterEach( function() {
//   dbConnection.end();
// })

test('should get a response from the server', () => {
  request.get('http://localhost:3000/', (error, response, body) => {
    if (error) { throw error; }
    expect(response.statusCode).toBe(200);
  });
});

test('server should return data from database', () => {
  request.get('http://localhost:3000/api/turash/reviews/0', (error, response, body) => {
    if (error) { throw error; }
    expect(body.length).toBeGreaterThanOrEqual(1);
  });
});

test('should seed and retrieve data from database', async (done) => {
  faker.insertIntoDb(1, (err) => {
    if (err) { throw err; }
    var query = `select * from reviews`;
    dbConnection.query(query, (err, results) => {
      if (err) { throw err; }
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThanOrEqual(1);
      expect(results[0]).toHaveProperty('userId', 'name', 'review', 'rating');
      done();
      dbConnection.end();
    });
  });
});
