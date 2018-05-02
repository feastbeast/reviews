// const fullList = require('./195-Zagat-AllData.json');
const Stores = require('./db/models/store.js');
const mongoose = require('mongoose');
const faker = require('faker');

const seedDb = () => {
  let counter = 10000;

  var createList = () => {
    let reviewsArr = [];
    for (var i = 0; i <= Math.floor(Math.random()*10); i++) {
      reviewsArr.push({
        "author_name": faker.name.findName(),
        "profile_photo_url": faker.image.imageUrl(),
        "rating": Math.floor(Math.random()*5),
        "relative_time_description": faker.date.past(),
        "text": faker.lorem.sentences()
      })
    }

    const obj = {
      place_id: "" + counter,
      name: faker.company.companyName(),
      reviews: reviewsArr,
      rating: Math.floor(Math.random()*5),
      price_level: Math.floor(Math.random()*5),
      neighborhood: faker.address.county(),
      city: faker.address.city(),
      street: faker.address.streetName(),
    };

    Stores.insertOne(obj, (err, content) => {
      if (err) {
        return err;
      }
      counter--;
      if (counter !== 0) {
        createList();
      } else {
        console.log('STORED 10000 Data!')
        mongoose.disconnect();
        return counter;
      }
    });
  };
  
  Stores.clearDb(() => createList());
};

seedDb();



  // var createList = () => {

  //   for (var j = 0; j < 10000; j++) {
  //     let reviewsArr = [];
  //     for (var i = 0; i <= Math.floor(Math.random()*20); i++) {
  //       reviewsArr.push({
  //         "author_name": faker.name.findName(),
  //         "profile_photo_url": faker.image.imageUrl(),
  //         "rating": Math.floor(Math.random()*5.5),
  //         "relative_time_description": faker.date.past(),
  //         "text": faker.lorem.sentences()
  //       })
  //     }

  //     const obj = {
  //       place_id: "" + j,
  //       name: faker.company.companyName(),
  //       reviews: reviewsArr,
  //       rating: Math.floor(Math.random()*5.5),
  //       price_level: Math.floor(Math.random()*5.5),
  //       neighborhood: faker.address.county(),
  //       city: faker.address.city(),
  //       street: faker.address.streetName(),
  //     };

  //     Stores.insertOne(obj, (err, content) => {
  //       if (err) {
  //         return err;
  //       } else {
  //         counter--;
  //         if (counter === 0) {
  //           console.log('STORED 10000 Data!')
  //           mongoose.disconnect();
  //           return counter;
  //         }
  //       }
  //     });
  //   }
    
  // };


