const fs = require('fs');
const csv = require('csv');
const split = require('split');
const stream = require('stream');
const db = require('./database/cassandra.js');


class MyWritable extends stream.Writable {
  constructor(options) {
    super(options)
  }

  _write(chunk, encoding, cb) {
    csv.parse(chunk.toString(), { delimiter: ',' }, (err, output) => {
    const query = `INSERT INTO reviews.reviews(id, carid, name, review, rating, date) VALUES (${Number(output[0][0])}, ${Number(output[0][1])}, $$${output[0][2]}$$, $$${output[0][3]}$$, ${Number(output[0][4])}, $$${output[0][5]}$$)`

    // console.log(query)

    db.client.execute(query)
      .then((res) => {
        console.log(output[0][0]);
        cb();
      })
      .catch((error) => {
        console.log('ERROR', error, output[0][4]);
        cb();
      });
  });
  }
}

const fileStream = fs.createReadStream('SEED_CAS.csv');
const lineStream = fileStream.pipe(split());

const myStream = new MyWritable();

lineStream.pipe(myStream);

lineStream.on('end', () => {
  console.log('Finished Reading');
});

myStream.on('finish', () => {
  console.log('Finished Writing', new Date().toLocaleTimeString());
});
