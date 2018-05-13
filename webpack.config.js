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
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       babelrc: false,
      //       presets: [
      //         ['es2015', { modules: false }],
      //         'react',
      //       ]
      //     }
      //   },
      // },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" 
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management'
    })
  ],
};