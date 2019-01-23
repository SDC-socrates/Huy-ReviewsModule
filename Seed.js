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
    // cb();
  });
     // It is important to callback, so that our stream can process the next chunk.
  }
}

const fileStream = fs.createReadStream('SEED_CAS.csv');
const lineStream = fileStream.pipe(split());

// Now an object for myWrtiable stream class

/*
  options can be:
   - decodeStrings: If you want strings to be buffered (Default: true)
   - highWaterMark: Memory for internal buffer of stream (Default: 16kb)
   - objectMode: Streams convert your data into binary, you can opt out of by setting this to true (Default: false)
*/

const myStream = new MyWritable();

/*
Now we'll just pipe our fileStream to myStream
(pipe calls write method intrinsically which in turn calls _write method intrinsically)
*/

lineStream.pipe(myStream);

/*
  When writable stream finishes writing data it fires "finish" event,
  When readable stream finishes reading data it fires "end" event.

  if you have piped a writable stream, like in our case
  it ends the writable stream once readable stream ends reading data by calling
  <writableStreamObject>.end() method (you can use this manually in other cases)
*/

lineStream.on('end', () => {
  console.log('Finished Reading');
});

myStream.on('finish', () => {
  console.log('Finished Writing', new Date().toLocaleTimeString());
});

// const readStream = fs.createReadStream('SEED_CAS.csv');
// const writeStream =
// const lineStream = readStream.pipe(split());
// lineStream.on('data', (data) => {
//   readStream.pause();
//   csv.parse(data, { delimiter: ',' }, (err, output) => {
//     const query = `INSERT INTO reviews.reviews(id, carid, name, review, rating, date) VALUES (${Number(output[0][0])}, ${Number(output[0][1])}, $$${output[0][2]}$$, $$${output[0][3]}$$, ${Number(output[0][4])}, $$${output[0][5]}$$)`;
//     // console.log(output[0]);
//     db.client.execute(query)
//       .then((res) => {
//         console.log('NEW REVIEW SAVED!');
//       })
//       .catch((error) => {
//         console.log('ERROR', error);
//       });
//   });
// });
