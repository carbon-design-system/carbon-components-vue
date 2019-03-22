const autoprefixer = require('autoprefixer');

module.exports = {
  parser: 'sugarss',
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {},
    cssnano: {},
    autoprefixer: {},
  },
};
