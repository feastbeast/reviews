const fs = require('fs');
const faker = require('faker');

const entryNum = 10000000;
let counter = -1;

const createReviews = (i) => {
  let csvReviews = '';
  for (let j = 1; j <= Math.floor(Math.random() * 10); j++) {
    counter += 1;
    const reviewId = counter;
    const restaurantId = i;
    const authorName = faker.name.findName();
    const profilePhoto = faker.image.avatar();
    const rating = Math.floor(Math.random() * 5);
    const timeDescript = faker.date.past();
    const text = faker.lorem.sentence();

    csvReviews += reviewId + '|' + restaurantId + '|' + authorName + '|' + profilePhoto + '|' + rating + '|' + timeDescript + '|' + text + '\n'
  }
  return csvReviews;
};

const generateReviews = () => {
  const options = {
    autoClose: true,
  };
  const writeStream = fs.createWriteStream('csvData-reviews.csv', options);
  let i = -1;
  const write = () => {
    let ok = true;
    do {
      i++;
      if (i === 0) {
        writeStream.write(createReviews(i));
      } else {
        ok = writeStream.write(createReviews(i));
      }
    } while (i < entryNum - 1 && ok);
    if (i < entryNum) {
      writeStream.once('drain', write);
    }
  };
  write();
};

generateReviews();

// psql -U tassteven apateez_reviews -c "COPY reviews FROM '/Users/tassteven/Documents/SDC-apateez/reviews-orig/csvData-reviews.csv' DELIMITER '|';"
