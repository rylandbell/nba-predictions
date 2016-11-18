// require('dotenv').config({silent:true});
const webpack = require('webpack');
const path = require('path');
// console.log(process.env);

const PATHS = {
  app: './src/main.jsx',
  dist: path.join(__dirname, './public/build')
};
 
module.exports = {
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  entry: {
    javascript: PATHS.app
  },
  output: {
    path: PATHS.dist,
    publicPath: '/',
    filename: 'bundle.js'
  },
  eslint: {
    emitWarning: true
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ["eslint-loader"],
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      }
    ]
  }
};