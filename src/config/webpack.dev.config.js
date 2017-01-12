// +++
// Thanks! (cut hot reloading...not using it)
// https://github.com/madole/webpack-dev-middleware-boilerplate/find/master

// +++
// Webpack Dependencies
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractLESS = new ExtractTextPlugin(
  'styles/bundle.css',
  { disabled:false, allChunks: true }
);

// +++
// Webpack DEVELOPMENT Config
module.exports = {

  devtool: 'source-map',

  entry: [
    __dirname + "/../client/js/index.js",
    __dirname + "/../client/less/index.js"//auto-compile less independent of JS
  ],

  output: {
    path: '/',
    filename: 'scripts/bundle.js',
    publicPath: 'http://localhost:3000/'
  },

  module: {
    loaders: [
      { test: /\.less$/,  exclude: /node_modules/, loader: extractLESS.extract(['css','less']) },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: {presets: ['es2015']} }
    ]
  },

  plugins: [
    extractLESS,
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: { warnings: false }
    })
  ]

};
