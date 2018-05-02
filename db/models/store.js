const mongoose = require('mongoose');

const mongoUrlDocker = 'mongodb://database/apateez-reviews';
const mongoUrl = 'mongodb://localhost/apateez-reviews';

mongoose.connect(mongoUrl); // Try localhost first

mongoose.connection.on('connected', () => {
  console.log('Mongoose connection open');
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error: ${err}`);
  mongoose.connect(mongoUrlDocker);
});

const storeSchema = mongoose.Schema({
  place_id: {
    type: String,
    unique: true,
  },
  name: String,
  price_level: Number,
  neighborhood: String,
  reviews: [
    [],
  ],
  city: String,
  street: String,
  rating: Number,
});

const Store = mongoose.model('Store', storeSchema);

const findOne = (id, callback) =>
  // console.log('find one db triggered with ', id);
  Store.find({ place_id: id }, callback);
const insertOne = (store, callback) => {
  // console.log('NEW STORE', store);
  Store.create(store, callback);
};

const clearDb = (cb) => {
  Store.remove({}, cb);
};


exports.findOne = findOne;
exports.insertOne = insertOne;
exports.clearDb = clearDb;
