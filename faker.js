const faker = require('faker');
const fs = require('fs');
const es = require('event-stream');
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
  writeToCassandra(JSON.parse(chunk));
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
    readableStream._read = () => {};
    readableStream.push(JSON.stringify(review));
    // reviews.push(review);
  }
  // readableStream._read = () => {};
  // readableStream.push(JSON.stringify(reviews));
  // piping
  readableStream.pipe(writableStream).on('error', console.error);
};

createData(100000);
