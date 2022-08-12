module.exports = {
  root: true,
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  plugins: ['vue', 'import', 'unicorn'],
  globals: {
    PKG_VERSION: true,
  },
  env: {
    'browser': true,
    'es6': true,
    'node': true
  },
  parserOptions: {
    'sourceType': 'module'
  },
  settings: {
    'import/resolver': {
      node: null,
      webpack: {
        config: 'build/webpack-configs/base.js',
      },
    },
    'import/extensions': ['.js', '.ts', '.json', '.vue'],
    'import/ignore': ['node_modules', '\\.(coffee|scss|css|less|hbs|svg|json)$']
  },
  rules: {
    'no-console': ['error', { 'allow': ['warn', 'error'] }],
    'no-constant-condition': ['error', { 'checkLoops': false }]
  },
  overrides: [{
    files: ['src/**/*.vue'],
    rules: {
      //indent: 'off', // not working well with .vue files so disable it
    },
  }],
}