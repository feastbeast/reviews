const fs = require('fs');
const faker = require('faker');

// 26595195

const entryNum = 10000000;
const reviewCount = 26595195;

let reviewId = 0;
let insertMax = 10;
let insertOne = false;
let remainRestaurants = entryNum;
let remainReviews = reviewCount;

const createEntry = (i) => {
  const reviewsArr = [];
  if (remainReviews < remainRestaurants + 9) {
    insertOne = true;
    insertMax = 1;
  }
  if (remainRestaurants === 1) {
    for (let x = 0; x < remainReviews; x++) {
      reviewsArr.push(reviewId);
      reviewId += 1;
    }
  } else {
    const numOfReviewsInserted = insertOne ? 1 : Math.floor(Math.random() * insertMax);
    remainReviews -= numOfReviewsInserted;
    for (let j = 0; j < numOfReviewsInserted; j++) {
      reviewsArr.push(reviewId);
      reviewId += 1;
    }
  }

  const placeId = i;
  const name = `"${faker.company.companyName()}"`;
  const reviewIds = reviewsArr;
  const rating = Math.floor(Math.random() * 5);
  const priceLevel = Math.floor(Math.random() * 4);
  const neighborhood = `"${faker.address.county()}"`;
  const city = `"${faker.address.city()}"`;
  const street = `"${faker.address.streetName()}"`;

  const csvFormat = placeId + '|' + name + '|' + '{' + reviewIds + '}' + '|' + rating + '|' + priceLevel + '|' + neighborhood + '|' + city + '|' + street + '\n';

  remainRestaurants -= 1;
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


// const createEntry = (i) => {
//   const reviewsArr = [];
//   for (let j = 0; j <= Math.floor(Math.random() * 10); j++) {
//     reviewsArr.push({
//       author_name: faker.name.findName(),
//       profile_photo_url: faker.image.avatar(),
//       rating: Math.floor(Math.random() * 5),
//       relative_time_description: faker.date.past(),
//       text: faker.lorem.sentence(),
//     });
//   }

//   const placeId = i;
//   const name = `"${faker.company.companyName()}"`;
//   const reviews = JSON.stringify(reviewsArr);
//   const rating = Math.floor(Math.random() * 5);
//   const priceLevel = Math.floor(Math.random() * 4);
//   const neighborhood = `"${faker.address.county()}"`;
//   const city = `"${faker.address.city()}"`;
//   const street = `"${faker.address.streetName()}"`;

//   const csvFormat = placeId + '|' + name + '|' + reviews + '|' + rating + '|' + priceLevel + '|' + neighborhood + '|' + city + '|' + street + '\n';

//   return csvFormat;
// };

// const generateCSV = () => {
//   const options = {
//     autoClose: true,
//   };
//   const writeStream = fs.createWriteStream('csvData.csv', options);
//   let i = -1;
//   const write = () => {
//     let ok = true;
//     do {
//       i++;
//       if (i === 0) {
//         writeStream.write(createEntry(i));
//       } else {
//         ok = writeStream.write(createEntry(i));
//       }
//     } while (i < entryNum - 1 && ok);
//     if (i < entryNum) {
//       writeStream.once('drain', write);
//     }
//   };
//   write();
// };
// generateCSV();

// psql -U tassteven apateez_reviews -c "COPY restaurants FROM '/Users/tassteven/Documents/SDC-apateez/reviews-orig/csvData.csv' DELIMITER '|';"
