const ESLintPlugin = require('eslint-webpack-plugin')
const merge = require('webpack-merge')
const utils = require('../utils')
const baseWebpackConfig = require('../base')

process.env.NODE_ENV = 'testing'

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  plugins: [new ESLintPlugin({
    'context': utils.resolve('test'),
    'extensions': ['js', 'vue']
  })],
  module: {
    rules: [
      utils.styleLoaders(),
    ],
  },
  devtool: false,
  optimization: {
    nodeEnv: process.env.NODE_ENV,
  },
})