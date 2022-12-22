/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: true,
        backgrounds: false,
        controls: true,
        docs: true,
        toolbars: true,
        viewport: true,
      },
    },
    '@storybook/addon-storysource',
    '@storybook/addon-a11y',
  ],
  core: {
    builder: 'webpack5',
  },
  features: {
    previewCsfV3: true,
  },
  stories: [
    './Welcome/__welcome-story.js',
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],

  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            context: 'docs/carbon-vue-icon/',
            from: '*',
            to: 'static/media/carbon-vue-icon/',
          },
        ],
      })
    );

    config.performance = {
      ...config.performance,
      maxEntrypointSize: 4194000,
      maxAssetSize: 2097000,
    };
    config.resolve.alias['@'] = path.resolve(__dirname, '../src');

    // Return the altered config
    return config;
  },
};
