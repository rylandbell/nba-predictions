const webpack = require('webpack');
const path = require('path');

const PATHS = {
  app: './src/main.jsx',
  dist: path.join(__dirname, './public/build')
};
 
module.exports = {
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({

      // Don't beautify output (enable for neater output)
      beautify: false,

      // Eliminate comments
      comments: false,

      // Compression specific options
      compress: {
        warnings: false,

        // Drop `console` statements
        drop_console: false
      },

      // Mangling specific options
      mangle: {
        // Don't mangle ['....']
        except: ['webpackJsonp'],

        // Don't care about IE8
        screw_ie8 : true,

        // Don't mangle function names
        keep_fnames: false
      }
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
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