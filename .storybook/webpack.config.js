const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: [/\.stories\.js$/, /index\.js$/],
        loaders: [require.resolve('@storybook/addon-storysource/loader')],
        include: [path.resolve(__dirname, '../src')],
        enforce: 'pre',
      },
      {
        test: /\.((s){0,1}css)$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
        include: path.resolve(__dirname, '../'),
      },
    ],
  },
};
