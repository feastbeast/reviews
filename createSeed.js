const fs = require('fs');
const faker = require('faker');

let entryNum = 10000000;

let createEntry = (i) => {
  let reviewsArr = [];
  for (var j = 0; j <= Math.floor(Math.random()*10); j++) {
    reviewsArr.push({
      "author_name": faker.name.findName(),
      "profile_photo_url": faker.image.avatar(),
      "rating": Math.floor(Math.random()*5),
      "relative_time_description": faker.date.past(),
      "text": faker.lorem.sentence()
    })
  }

  const obj = {
    place_id: "" + i,
    name: faker.company.companyName(),
    reviews: reviewsArr,
    rating: Math.floor(Math.random()*5),
    price_level: Math.floor(Math.random()*4),
    neighborhood: faker.address.county(),
    city: faker.address.city(),
    street: faker.address.streetName(),
  };

  return obj;
}

let generateJSON = () => {
  var options = {
    autoClose: true
  };
  let writeStream = fs.createWriteStream('millionData.json', options);
  let i = -1;
  const write = function() {
    let ok = true;
    do {
      i++;
      if (i === 0) {
        writeStream.write('[' + JSON.stringify(createEntry(i)) + ',');
      } else {
        ok = writeStream.write(JSON.stringify(createEntry(i)) + ',');
      }
    } while (i < entryNum - 1 && ok);
    if (i < entryNum) {
      writeStream.once('drain', write);
    }
  };
  write();
  // let options = {
  //   autoClose: true
  // };

  // let writeStream = fs.createWriteStream('millionData.json', options);
  // let i = -1;
  // let write = function() {
  //   var ok = true;
  //   do {
  //     i++;
  //     if (i === 0) {
  //       writeStream.write('[' + JSON.stringify(createEntry(i))+ ',');
  //     } else if (i === entryNum) {
  //       writeStream.write(JSON.stringify(createEntry(i)) + ',');
  //     } else {
  //       ok = writeStream.write(JSON.stringify(createEntry(i))+ ',');
  //     }
  //   } while (i <= entryNum && ok);
  //   if (i <= entryNum) {
  //     writeStream.once('drain', write);
  //   }
  // };
  // write();
}
    // if (i === counter - 1) {
    //   fs.appendFileSync('./millionData.json', JSON.stringify(obj)+']', function (err) {
    //   if (err) throw err;
    //   console.log('Saved!', obj);
    //   });
    // } else {
    //   fs.appendFileSync('./millionData.json', JSON.stringify(obj)+',', function (err) {
    //   if (err) throw err;
    //   console.log('Saved!', obj);
    //   });
    // }
  
generateJSON();

// truncate -s -1 millionData.json
// echo ] >> millionData.json
// mongoimport --jsonArray -d apateez-reviews -c stores --file millionData.json --numInsertionWorkers 8