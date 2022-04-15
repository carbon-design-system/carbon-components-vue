
module.exports = {
  parser: 'postcss-scss',
  plugins: [
    require('postcss-import'), 
    require('postcss-preset-env'),
    require('autoprefixer')
  ],
};
