const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  config.plugins.push(
    new CopyPlugin([
      {
        context: '../docs/carbon-vue-icon/',
        from: '*',
        to: 'static/media/carbon-vue-icon/',
      },
    ])
  );

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
    test: /\.md$/i,
    use: 'raw-loader',
  });

  config.module.rules.push({
    test: /\.jsonl$/,
    loaders: ['jsonlines-loader'],
  });

  // auto prefix anything in a vue file
  config.resolve.extensions.push('.js', '.vue', '.json', '.jsonl');

  return config;
};
