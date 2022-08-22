process.env.CHROME_BIN = require('puppeteer').executablePath()

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
  })
}
