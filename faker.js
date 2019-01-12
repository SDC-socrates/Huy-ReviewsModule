const faker = require('faker');
const postgres = require('./database/index.js');
const cassandra = require('./database/cassandra.js');

const insertIntoDb = (numOfTimes = 10000) => {
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

  // reviews.sort(function compare(a, b) {
  //   if (a[4] < b[4]) {
  //     return -1;
  //   }
  //   if (a[4] > b[4]) {
  //     return 1;
  //   }
  //   return 0;
  // });

  let timer = 500;
  let i = 0;
  while (i < 1000) {
    setTimeout(() => { postgres.Reviews.bulkCreate(reviews); }, timer);
    setTimeout(() => {
      reviews.forEach((review) => {
        cassandra.execute(`INSERT INTO reviews.reviews(id, carid, name, review, rating, date) VALUES (uuid(), ${review.carid}, $$${review.name}$$, $$${review.review}$$, ${review.rating}, $$${review.date}$$)`, (err, result) => {
          if (err) {
            console.log('INSERT ERROR', err);
          }
        });
      });
    }, timer);
    timer += 1000;
    i += 1;
  }
};

module.exports = {
  insertIntoDb,
};

// To call the function in command line
require('make-runnable');
