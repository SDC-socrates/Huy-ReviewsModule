const faker = require('faker');
const fs = require('fs');
const Stream = require('stream');
const postgres = require('./database/index.js');
const cassandra = require('./database/cassandra.js');

const readableStream = new Stream.Readable();
const writableStream = new Stream.Writable();

const writeToPostgres = (reviews) => {
  postgres.Reviews.bulkCreate(reviews);
};

const writeToCassandra = (review) => {
  cassandra.execute(`INSERT INTO reviews.reviews(id, carid, name, review, rating, date) VALUES (uuid(), ${review.carid}, $$${review.name}$$, $$${review.review}$$, ${review.rating}, $$${review.date}$$)`, (err, result) => {
    if (err) {
      console.log('INSERT ERROR', err);
    }
  });
};

writableStream._write = (chunk, encoding, next) => {
  writeToPostgres(JSON.parse(chunk));
  next();
};

const createData = (numOfTimes) => {
  const reviews = [];
  for (let i = 0; i < numOfTimes; i += 1) {
    const review = {
      carid: faker.random.number({
        min: 1,
        max: 100,
      }),
      name: faker.name.findName(),
      review: faker.lorem.sentences(3),
      rating: faker.random.number({
        min: 1,
        max: 5,
      }),
      date: faker.date.recent(5).toString().slice(4, 15),
    };
    reviews.push(review);
  }
  readableStream.push(JSON.stringify(reviews));
  readableStream._read = function () {};
  // piping
  readableStream.pipe(writableStream).on('error', console.error);
  readableStream.on('data', (chunk) => {
    seedTenMillion(writableStream, chunk, 'utf8', (err, res) => {
      if (!err) {
        console.log('write SUCCESS');
      }
    });
  });
};

createData(1000);


// writableStream._write = (chunk, encoding, next) => {
//   writeToPostgres(JSON.parse(chunk));
//   next();
// };

// reviews.sort((a, b) => {
//   if (a[4] < b[4]) {
//     return -1;
//   }
//   if (a[4] > b[4]) {
//     return 1;
//   }
//   return 0;
// });


const seedTenMillion = (writer, data, encoding, callback) => {
  let i = 9999;
  function write() {
    let ok = true;
    do {
      i -= 1;
      if (i === 0) {
        // last time!
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
};
