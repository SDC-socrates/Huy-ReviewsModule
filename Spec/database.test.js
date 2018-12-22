const faker = require('../faker.js');
const db = require('../database/index.js')
var mysql = require('mysql');

var connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'reviews'
});

beforeEach(() => {
  connection.query('delete from reviews', (err) => {
    if (err) { throw err; }
  });
});

afterEach(() => {
  connection.end();
});


test('should seed and retrieve data from database', async (done) => {
  faker.insertIntoDb();
  db.getAllUsers( (err, result) => {
    if (err) { throw err; }
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(100);
    expect(result[0]).toHaveProperty('userId', 'name', 'review', 'rating');
    done();
  });
});