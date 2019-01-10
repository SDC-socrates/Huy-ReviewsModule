const faker = require('faker');
const db = require('./database/index.js');

const insertIntoDb = (numOfTimes = 103) => {
  var users = [];
  for (let i = 0; i < numOfTimes; i++) {
    const user = {
      carId: faker.random.number({
        min: 1,
        max: 30,
      }),
      userName: faker.name.findName(),
      userReview: faker.lorem.sentences(3),
      userReviewDate: faker.date.recent(5).toString().slice(4, 15),
      userRating: faker.random.number({
        min: 1,
        max: 5,
      })
    }
    users.push(user);

  }

  users.sort(function compare(a, b) {
    if (a[4] < b[4]) {
      return -1;
    }
    if (a[4] > b[4]) {
      return 1;
    }
    return 0;
  });

  users.forEach( (currentElement) => {
    db.addNewUser(currentElement);
  })
};

module.exports = {
  insertIntoDb,
};

// To call the function in command line
require('make-runnable');
