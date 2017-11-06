
const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, 'client'),
  entry: {
    app: './js/chat.js',
  },
  output: {
    path: path.join(__dirname, 'public/chat/assets/js'),
    filename: 'chat.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
            plugins: []
          }
        }],
      },
    ],
  },
};
