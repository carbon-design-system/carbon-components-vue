const path = require('path');
const autoprefixer = require('autoprefixer');

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
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer({ browsers: ['last 2 versions'] })],
            },
          },
          'sass-loader',
        ],
        include: path.resolve(__dirname, '../'),
      },
    ],
  },
};
