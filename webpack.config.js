const webpack = require('webpack');
const path = require('path');
var SRC_DIR = path.join(__dirname, '/client');
var DIST_DIR = path.join(__dirname, '/public');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify('http://localhost:3003'),
      APIKEY: JSON.stringify('YOUR_API_KEY'),
    })
  ],
  context: __dirname + '/client',
  entry: './index.jsx',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include : SRC_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'env']
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
    ],
  },
  output: {
    path: __dirname + '/public',
    filename: 'app.js',
  }
};
