var faker = require('faker');
var db = require('./database/index.js');

const insertIntoDb = ((numOfTimes = 100) => {
  for(var i = 0; i < numOfTimes; i++) {
    var id = faker.random.number();
    var name = faker.name.findName();
    var review = faker.lorem.sentences();
    var rating = faker.random.number({
      'min': 1,
      'max': 5
    });

    db.addNewUser(id,name,review,rating);
  }
})();

module.exports = {
  insertIntoDb
};