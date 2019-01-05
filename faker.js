const faker = require('faker');
const db = require('./database/index.js');

const insertIntoDb = (numOfTimes = 103) => {
  var users = [];
  for (let i = 0; i < numOfTimes; i++) {
    var user = [];
    const userId = faker.random.number({
      min: 1,
      max: 30,
    });
    const name = faker.name.findName();
    const review = faker.lorem.sentences();
    const date = faker.date.recent(5).toString().slice(4, 15);
    const rating = faker.random.number({
      min: 1,
      max: 5,
    });
    user.push(userId, name, review, rating, date);
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
    db.addNewUser(
      currentElement[0],
      currentElement[1],
      currentElement[2],
      currentElement[3],
      currentElement[4]
    );
  })
};

module.exports = {
  insertIntoDb,
};

// To call the function in command line
require('make-runnable');
