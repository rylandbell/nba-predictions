// Should only run in a development environment (e.g., locally)

const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const PATHS = {
  app: './src/main.jsx',
  css: './src/css/style.css',
  dist: path.join(__dirname, './public/build')
};

module.exports = {
  entry: {
    bundle: PATHS.app
  },
  output: {
    path: PATHS.dist,
    filename: "[name].js"
  },
  module: {
    rules: [
      // {
      //   test: /\.jsx?$/,
      //   exclude: /node_modules/,
      //   enforce: "pre",
      //   loader: "eslint-loader",
      //   options: {
      //     fix: false
      //   }
      // },
      {
        test: /\.jsx?$/,
        loader: "babel-loader"
      },
      {
        test: /\.(png|jpg|svg|eot|ttf|woff|woff2)$/,
        loader: "file-loader"
      },
      // Don't use PostCSS on vendor code
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            "postcss-loader"
          ]
        })
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader"]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("bundle.css")

    // Minify JS Code (reduces file size by ~60-70%, but makes it unreadable)
    // new webpack.optimize.UglifyJsPlugin()
  ]
};
