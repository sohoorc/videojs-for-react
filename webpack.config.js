const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    "./src"
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "index.js", // string
    publicPath: '/dist/',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use:["style-loader","css-loader"] 
      },
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader'
      }
    ]
  }
};