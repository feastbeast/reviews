const promise = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: promise });

// POSTGRES CONNECTION:
const cn = 'postgres://localhost:5432/apateez_reviews';
const db = pgp(cn);

const findOne = (id) => {
  console.log('Inside FINDONE!!!!');
  return db.any('SELECT * FROM restaurants WHERE place_id = $1', id);
};

exports.findOne = findOne;
