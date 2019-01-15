const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'reviews' });


// const loadBatchSize = 17550;
// const totalBatches = Object.keys(seedHelpers.carModels).length;

// let queries = [];


// const queryTemplate = {
//   query: `
//     INSERT INTO carsByStatusAndCategory
//       (id, carid, name, review, rating, date)
//       VALUES (uuid(), ?, ?, ?, ?, ?, ?, ?, ?)
//     `,
// };

// Read reviews and print to console
const getReview = (callback) => {
  client.execute('SELECT * FROM reviews', (err, result) => {
    if (!err) {
      if (result.rows.length > 0) {
        const review = result.rows[0];
        console.log('name = %s, rating = %d', review.name, review.rating);
      } else {
        console.log('No results');
      }
    }
    // Run next function in series
    callback(err, null);
  });
};


module.exports = client;
