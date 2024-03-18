const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const utils = require('./utils')

module.exports = {

  // resets the default mode
  mode: 'none',

  cache: (process.env.NODE_ENV !== 'testing'),

  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      // for consistent docs
      '@riophae/vue-treeselect': utils.resolve('src'),
      // for shorter import path in tests
      '@src': utils.resolve('src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: ['src', 'docs', 'test'].map(utils.resolve),
      },
      {
        test: /\.pug$/,
        loader: '@webdiscus/pug-loader',
        options: {
          pretty: true,
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset/resource'
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source',
      }
    ],
  },

  optimization: {
    concatenateModules: true,
    emitOnErrors: false,
  },

  node: {

  },

  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      PKG_VERSION: JSON.stringify(require('../../package').version),
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
    }),
  ],

}
