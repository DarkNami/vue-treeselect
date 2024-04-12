const webpack = require('webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
const { merge } = require('webpack-merge')
const utils = require('../utils')
const baseWebpackConfig = require('../base')

process.env.NODE_ENV = 'testing'

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  plugins: [
    new ESLintPlugin({
    'context': utils.resolve('test'),
    'extensions': ['js', 'vue']
    }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
  ],
  module: {
    rules: [
      utils.styleLoaders(),
    ],
  },
  devtool: false,
  optimization: {
    nodeEnv: false,
  },
})
