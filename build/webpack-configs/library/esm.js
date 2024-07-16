const { merge } = require('webpack-merge')
const { libraryTargetPlaceholder } = require('../../config').library

module.exports = webpackConfig => merge(webpackConfig, {

  experiments: {
    outputModule: true,
  },

  output: {
    filename: webpackConfig.output.filename.replace(libraryTargetPlaceholder, 'esm'),
    module: true,
    library: {
      type: 'module',
    },
    environment: {
      module: true
    },
  },

  externalsType: 'module',

  externals: {
    vue: 'module vue',
  },

})
