import { dirname, join } from "path";
/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

/** @type {import('@storybook/vue3-webpack5').StorybookConfig} */
const config = {
  framework: {
    name: '@storybook/vue3-webpack5',
    options: {},
  },

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
    getAbsolutePath("@storybook/addon-storysource"),
    getAbsolutePath("@storybook/addon-a11y"),
  ],

  features: {
    // No feature flags for now
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

    const vueLoader = config.module.rules.find(
      r => r.loader && r.loader.includes('/vue-loader/')
    );
    if (vueLoader)
      vueLoader.options = {
        ...vueLoader.options,
        compilerOptions: {
          // treat any tag that starts with ion- as custom elements
          isCustomElement: tag => tag.startsWith('bx-'),
        },
      };
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
      maxEntrypointSize: 5000000,
      maxAssetSize: 4000000,
    };

    // Return the altered config
    return config;
  },

  docs: {
    autodocs: true
  }
};
export default config;

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
