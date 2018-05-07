const fs = require('fs');
const faker = require('faker');

const entryNum = 10000000;

const createEntry = (i) => {
  const reviewsArr = [];
  for (let j = 0; j <= Math.floor(Math.random() * 10); j++) {
    reviewsArr.push({
      author_name: faker.name.findName(),
      profile_photo_url: faker.image.avatar(),
      rating: Math.floor(Math.random() * 5),
      relative_time_description: faker.date.past(),
      text: faker.lorem.sentence(),
    });
  }

  const obj = {
    place_id: `${i}`,
    name: faker.company.companyName(),
    reviews: reviewsArr,
    rating: Math.floor(Math.random() * 5),
    price_level: Math.floor(Math.random() * 4),
    neighborhood: faker.address.county(),
    city: faker.address.city(),
    street: faker.address.streetName(),
  };

  return obj;
};

const generateJSON = () => {
  const options = {
    autoClose: true,
  };
  const writeStream = fs.createWriteStream('millionData.json', options);
  let i = -1;
  const write = () => {
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
};
generateJSON();

// truncate -s -1 millionData.json
// echo ] >> millionData.json
// mongoimport --jsonArray -d apateez-reviews -c stores --file millionData.json --numInsertionWorkers 8

