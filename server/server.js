// -------------------------------------POSTGRES--------------------------------------
const newrelic = require('newrelic');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./../db/postgres/pg-store.js');

// optimization of node
// socket opening
const http = require('http');
http.globalAgent.maxSockets = 50;

// compression
const compression = require('compression');

// redis
const redis = require('redis');
const client = redis.createClient();

var cluster = require('cluster');

if (cluster.isMaster) {
  var numWorkers = require('os').cpus().length;

  console.log('Master cluster setting up ' + numWorkers + ' workers...');

  for(var i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online');
  });

  cluster.on('exit', function(worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  const app = express();
  const port = process.env.PORT || 3003;

  app.use(compression({
    filter: function () { return true; },
  }));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  app.use(morgan('dev'));
  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({ extended: false }));

  app.use('/', express.static(path.join(__dirname, '../public')));
  app.use('/restaurants', express.static(path.join(__dirname, '../public')));

  app.get('/restaurants/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  const getRestaurantData = (req, res) => {
    const id = req.params.id;
    db.findOne(id)
      .then((data) => {
        res.send(data);
        client.setex(id, 3600, JSON.stringify(data));
      })
      .catch((error) => {
        console.log('ERROR: ', error);
      });
  };

  const getCache = (req, res) => {
    const id = req.params.id;
    client.get(id, (err, result) => {
      if (result) {
        res.send(result);
      } else {
        getRestaurantData(req, res);
      }
    });
  };

  app.get('/api/restaurants/:id', getCache);

  app.listen(port, () => {
    console.log(`server running at PORT: ${port}`);
  });
}


// -------------------------------------MONGODB--------------------------------------

// const express = require('express');
// const morgan = require('morgan');
// const path = require('path');

// const app = express();
// const port = process.env.PORT || 3003;
// const Stores = require('./../db/models/store.js');

// const bodyParser = require('body-parser');

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// app.use(morgan('dev'));
// app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/restaurants', express.static(path.join(__dirname, '../public')));

// app.get('/restaurants/:id', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// });

// app.get('/api/restaurants/:id', (req, res) => {
//   const place_id = req.params.id;
//   // console.log('place_id IS :', place_id)
//   Stores.findOne(place_id)
//     .then((data) => {
//       // console.log('data ', data);
//       res.send(data[0]);
//     });
// });

// app.listen(port, () => {
//   console.log(`server running at PORT: ${port}`);
// });


/*
'use strict';

//Define all dependencies needed
const express = require('express');
const responseTime = require('response-time')
const axios = require('axios');

//Load Express Framework
var app = express();

//Create a middleware that adds a X-Response-Time header to responses.
app.use(responseTime());

const getBook = (req, res) => {
  let isbn = req.query.isbn;
  let url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
  axios.get(url)
    .then(response => {
      let book = response.data.items
      res.send(book);
    })
    .catch(err => {
      res.send('The book you are looking for is not found !!!');
    });
};

app.get('/book', getBook);

app.listen(3000, function() {
  console.log('Your node is running on port 3000 !!!')
});

*/

