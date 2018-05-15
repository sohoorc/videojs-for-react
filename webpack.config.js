const path = require('path');
const webpack = require('webpack')
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    "babel-polyfill",
    "./src"
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "index.js", // string
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      { 
        test:  /\.(js|jsx|mjs)$/, 
        exclude: /node_modules/, 
        loader: "babel-loader"
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader'
      }
    ],
  },
};