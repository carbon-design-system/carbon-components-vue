const path = require('path');
const autoprefixer = require('autoprefixer')({ browsers: ['last 2 versions'] });

module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  config.module.rules.push({
    test: /-story\.js$/,
    include: path.resolve(__dirname, '../stories'),
    loader: require.resolve('@storybook/addon-storysource/loader'),
    options: {
      prettierConfig: {
        parser: 'babel', // Remove warnings when loading story source files
      },
    },
    enforce: 'pre',
  });

  config.module.rules.push({
    test: /\.(s){0,1}css$/,
    loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../../'),
  });

  // auto prefix anything in a vue file
  config.resolve.extensions.push('.js', '.vue', '.json');
  let vueLoaderConfig = config.module.rules.find(item => {
    return item.loader && item.loader.indexOf('vue-loader') > -1;
  });
  vueLoaderConfig.options = {
    ...vueLoaderConfig.options,
    postcss: [autoprefixer],
  };

  return config;
};
