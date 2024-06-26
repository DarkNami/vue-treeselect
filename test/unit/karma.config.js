process.env.CHROME_BIN = require('puppeteer').executablePath()

function KarmaWebpackOutputFramework(config) {
  // This controller is instantiated and set during the preprocessor phase.
  const controller = config.__karmaWebpackController;
  // only if webpack has instantiated its controller
  if (!controller) {
      console.warn(
        'Webpack has not instantiated controller yet.\n' +
        'Check if you have enabled webpack preprocessor and framework before this framework'
      )
      return
  }
  config.files.push({
      pattern: `${controller.outputPath}/**/*.png`,
      included: false,
      served: true,
      watched: false
  })
}

const KarmaWebpackOutputPlugin = {
  'framework:webpack-output': ['factory', KarmaWebpackOutputFramework],
};

module.exports = config => {
  config.set({
    files: ['./index.js'],
    browsers: ['ChromeHeadless'], // 'Chrome' or 'ChromeHeadless'
    preprocessors: {
      './index.js': ['webpack', 'sourcemap'],
    },
    webpack: require('../../build/webpack-configs/test'),
    webpackMiddleware: {
      noInfo: true,
    },
    frameworks: ['jasmine', 'jasmine-matchers'], // , add 'webpack' for webpack 5
    client: {
      jasmine: { random: false },
    },
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' },
      ],
    },
    autoWatchBatchDelay: 1000,
    browserConsoleLogOptions: {
      level: 'log',
    },
    retryLimit: 5,
  })
  config.plugins.push(KarmaWebpackOutputPlugin)
  config.frameworks.push('webpack-output')
}
