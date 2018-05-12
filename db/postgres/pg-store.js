const promise = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: promise });

// POSTGRES CONNECTION:
const cn = 'postgres://localhost:5432/apateez_reviews';
const db = pgp(cn);

const findOne = id => db.any('SELECT * FROM restaurants r LEFT JOIN reviews rw ON r.place_id = rw.restaurant_id WHERE place_id = $1', id);

exports.findOne = findOne;
