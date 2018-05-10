const fs = require('fs');
const faker = require('faker');

const entryNum = 10000000;
let counter = -1;

const createReviews = () => {
  let csvReviews = '';
  for (let j = 1; j <= Math.floor(Math.random() * 10); j++) {
    counter += 1;
    const reviewId = counter;
    const authorName = faker.name.findName();
    const profilePhoto = faker.image.avatar();
    const rating = Math.floor(Math.random() * 5);
    const timeDescript = faker.date.past();
    const text = faker.lorem.sentence();

    csvReviews += reviewId + '|' + authorName + '|' + profilePhoto + '|' + rating + '|' + timeDescript + '|' + text + '\n'
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
        writeStream.write(createReviews());
      } else {
        ok = writeStream.write(createReviews());
      }
    } while (i < entryNum - 1 && ok);
    if (i < entryNum) {
      writeStream.once('drain', write);
    }
  };
  write();
};

generateReviews();
