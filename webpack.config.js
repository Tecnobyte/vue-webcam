const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
var path = require('path')

module.exports = {
  entry: './test/index.js',
  // output: {
  //   path: './test',
  //   publicPath: 'test/'
  //   // filename: 'build-docs.js'
  // },
  // resolve: {
  //   root: path.resolve('./')
  // },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader']},
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './test/index.html',
    }),
    new VueLoaderPlugin(),
  ]
};