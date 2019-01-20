const faker = require('faker');

const createRandomData = (userContext, events, done) => {
  // make fake params
  const id = faker.random.number({
    min: 12000000,
    max: 13000000,
  });
  const carid = faker.random.number({
    min: 1,
    max: 10000000,
  });
  const name = faker.name.findName();
  const review = faker.lorem.sentences(3);
  const rating = faker.random.number({
    min: 1,
    max: 5,
  });
  const date = faker.date.recent(5).toString().slice(4, 15);

  // assign to input of artillery
  userContext.vars.id = id;
  userContext.vars.carid = carid;
  userContext.vars.name = name;
  userContext.vars.review = review;
  userContext.vars.rating = rating;
  userContext.vars.date = date;

  // finish
  return done();
};

const createRandomId = (userContext, events, done) => {
  // make fake params
  const carid = faker.random.number({
    min: 1,
    max: 10000000,
  });

  // assign to input of artillery
  userContext.vars.carid = carid;

  // finish
  return done();
};

module.exports = {
  createRandomData, createRandomId,
};
