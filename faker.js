const faker = require('faker');
const db = require('./database/index.js');

const insertIntoDb = ((numOfTimes = 101) => {
  for (let i = 0; i < numOfTimes; i += 1) {
    const userId = faker.random.number();
    const name = faker.name.findName();
    const review = faker.lorem.sentences();
    const rating = faker.random.number({
      min: 1,
      max: 5,
    });

    db.addNewUser(userId, name, review, rating);
  }
});

module.exports = {
  insertIntoDb
};
