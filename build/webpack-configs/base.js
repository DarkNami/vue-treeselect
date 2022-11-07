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
      // use the full development build of Vue
      // see: https://vuejs.org/v2/guide/installation.html#Explanation-of-Different-Builds
      'vue$': 'vue/dist/vue',
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
        test: /\.js$/,
        loader: 'babel-loader',
        include: ['src', 'docs', 'test'].map(utils.resolve),
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true,
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
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
    }),
  ],

}
