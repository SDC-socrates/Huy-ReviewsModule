const faker = require('faker');
const db = require('./database/index.js');

const insertIntoDb = ((numOfTimes = 100) => {
  for (let i = 0; i < numOfTimes; i += 1) {
    const id = faker.random.number();
    const name = faker.name.findName();
    const review = faker.lorem.sentences();
    const rating = faker.random.number({
      min: 1,
      max: 5,
    });

    db.addNewUser(id, name, review, rating);
  }
})();

module.exports = {
  insertIntoDb,
};
