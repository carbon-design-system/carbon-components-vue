const path = require('path');
const autoprefixer = require('autoprefixer')({ browsers: ['last 2 versions'] });

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules.push({
    test: /-story\.js$/,
    include: path.resolve(__dirname, '../src'),
    loader: require.resolve('@storybook/addon-storysource/loader'),
    options: {
      prettierConfig: {
        parser: 'babylon', // Remove warnings when loading story source files
      },
    },
    enforce: 'pre',
  });
  defaultConfig.resolve.extensions.push('.js', '.vue', '.json');

  let vueLoaderConfig = defaultConfig.module.rules.find(
    item => item.loader.indexOf('vue-loader') > -1
  );
  vueLoaderConfig.options = {
    ...vueLoaderConfig.options,
    postcss: [autoprefixer],
  };

  return defaultConfig;
};
