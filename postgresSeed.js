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

  const placeId = i;
  const name = `"${faker.company.companyName()}"`;
  const reviews = JSON.stringify(reviewsArr);
  const rating = Math.floor(Math.random() * 5);
  const priceLevel = Math.floor(Math.random() * 4);
  const neighborhood = `"${faker.address.county()}"`;
  const city = `"${faker.address.city()}"`;
  const street = `"${faker.address.streetName()}"`;

  const csvFormat = placeId + '|' + name + '|' + reviews + '|' + rating + '|' + priceLevel + '|' + neighborhood + '|' + city + '|' + street + '\n';

  return csvFormat;
};

const generateCSV = () => {
  const options = {
    autoClose: true,
  };
  const writeStream = fs.createWriteStream('csvData.csv', options);
  let i = -1;
  const write = () => {
    let ok = true;
    do {
      i++;
      if (i === 0) {
        writeStream.write(createEntry(i));
      } else {
        ok = writeStream.write(createEntry(i));
      }
    } while (i < entryNum - 1 && ok);
    if (i < entryNum) {
      writeStream.once('drain', write);
    }
  };
  write();
};
generateCSV();

// psql -U tassteven apateez_reviews -c "COPY restaurants FROM '/Users/tassteven/Documents/SDC-apateez/reviews-orig/csvData.csv' DELIMITER '|';"

