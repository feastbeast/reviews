const fs = require('fs');
const faker = require('faker');

let generateJSON = () => {
  let counter = 10000000;

  for (var i = 0; i < counter; i++) {
    let reviewsArr = [];
    for (var j = 0; j <= Math.floor(Math.random()*10); j++) {
      reviewsArr.push({
        "author_name": faker.name.findName(),
        "profile_photo_url": faker.image.avatar(),
        "rating": Math.floor(Math.random()*5),
        "relative_time_description": faker.date.past(),
        "text": faker.lorem.sentences()
      })
    }

    const obj = {
      place_id: "" + i,
      name: faker.company.companyName(),
      reviews: reviewsArr,
      rating: Math.floor(Math.random()*5),
      price_level: Math.floor(Math.random()*5),
      neighborhood: faker.address.county(),
      city: faker.address.city(),
      street: faker.address.streetName(),
    };

    if (i === counter - 1) {
      fs.appendFileSync('./millionData.json', JSON.stringify(obj)+']', function (err) {
      if (err) throw err;
      console.log('Saved!', obj);
      });
    } else {
      fs.appendFileSync('./millionData.json', JSON.stringify(obj)+',', function (err) {
      if (err) throw err;
      console.log('Saved!', obj);
      });
    }
  }
}

generateJSON();


// mongoimport --jsonArray -d apateez-reviews -c stores --file millionData.json --numInsertionWorkers 8