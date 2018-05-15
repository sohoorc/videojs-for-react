const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    "babel-polyfill",
    "./src/index.js"
  ],
  output: {
    path: path.join(__dirname, 'example', 'dist'),
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
        // options: {
        //   presets: ["env"]
        // },
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management'
    })
  ],
};