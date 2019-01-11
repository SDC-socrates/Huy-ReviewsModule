const faker = require('faker');
const db = require('./database/index.js');

const insertIntoDb = (numOfTimes = 1000) => {
  const reviews = [];
  for (let i = 0; i < numOfTimes; i += 1) {
    const review = {
      id: i + 1,
      carid: faker.random.number({
        min: 1,
        max: 11111111,
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

  reviews.sort(function compare(a, b) {
    if (a[4] < b[4]) {
      return -1;
    }
    if (a[4] > b[4]) {
      return 1;
    }
    return 0;
  });

  db.Reviews.bulkCreate(reviews)

  // reviews.forEach((currentElement) => {
  //   // console.log('ELEMENTTTTTTT', currentElement);
  //   db.Reviews.create(currentElement);
  // });
};

module.exports = {
  insertIntoDb,
};

// To call the function in command line
require('make-runnable');
