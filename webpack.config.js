const webpack = require('webpack');
const path = require('path');
 
const PATHS = {
  app: './src/main.jsx',
  dist: path.join(__dirname, './public/js')
};
 
module.exports = {
  entry: {
    javascript: PATHS.app
  },
  output: {
    path: PATHS.dist,
    publicPath: '/',
    filename: 'bundle.js'
  },
  // devServer: {
  //   contentBase: PATHS.dist
  // },
  eslint: {
    emitWarning: true
  },
  module: {
    preLoaders: [
      {
        test: /\.js?x$/,
        loaders: ["eslint-loader"],
        exclude: /node_modules/
      }
    ],
    loaders: [
      // {
      //   test: /\.html$/,
      //   loader: "file?name=[name].[ext]"
      // },
      {
        test: /\.js?x$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      }
    ]
  }
};