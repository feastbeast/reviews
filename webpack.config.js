const webpack = require('webpack');
const path = require('path');
var SRC_DIR = path.join(__dirname, '/client');
var DIST_DIR = path.join(__dirname, '/public');

const common = {
  plugins: [
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify('http://localhost:3003'),
      APIKEY: JSON.stringify('YOUR_API_KEY'),
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include : SRC_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'env']
        },
      },
    ],
  }
};

const client = {
  entry: `${SRC_DIR}/client.js`,
  output: {
    filename: 'reviews.js',
    path: DIST_DIR,
  }
};

const server = {
  entry: `${SRC_DIR}/server.js`,
  target: 'node',
  output: {
    path: DIST_DIR,
    filename: 'reviews-server.js',
    libraryTarget: "commonjs-module"
  },
};

module.exports = [
  Object.assign({}, common, server),
  Object.assign({}, common, client)
];
