const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const WebpackCdnPlugin = require('webpack-cdn-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const config = require('../../config')
const utils = require('../utils')

const ENABLE_SOURCE_MAP = false

const assetsPath = path => [
  config.docs.assetsSubDirectory,
  path,
].join('/')

const webpackConfig = merge(require('./base'), {

  mode: 'production',

  entry: {
    app: utils.resolve('docs/main.js'),
  },

  output: {
    publicPath: config.docs.assetsPublicPath,
    filename: assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: assetsPath('js/[id].[chunkhash].js'),
  },

  module: {
    rules: [
      utils.styleLoaders({
        sourceMap: ENABLE_SOURCE_MAP,
        extract: true,
      }),
    ],
  },

  devtool: ENABLE_SOURCE_MAP ? 'source-map' : false,

  plugins: [
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: assetsPath('css/[name].[contenthash].css'),
      chunkFilename: '[id].css',
    }),
    new WebpackCdnPlugin({
      modules: [{
        name: 'vue',
        var: 'Vue',
        path: 'dist/vue.min.js',
        prodUrl: '//cdn.jsdelivr.net/npm/:name@:version/:path',
      }],
      publicPath: '/node_modules',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: utils.resolve('static'),
          to: utils.resolve('gh-pages/static'),
        }, {
          from: utils.resolve('docs/CNAME'),
          to: utils.resolve('gh-pages'),
        }, {
          from: utils.resolve('docs/browserconfig.xml'),
          to: utils.resolve('gh-pages'),
        }, {
          from: utils.resolve('.circleci'),
          to: utils.resolve('gh-pages/.circleci'),
        }
      ]
    }),
  ],

  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          sourceMap: ENABLE_SOURCE_MAP,
        }
      }),
      new CssMinimizerPlugin(),
    ],
  },

})

if (config.docs.bundleAnalyzerReport) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
