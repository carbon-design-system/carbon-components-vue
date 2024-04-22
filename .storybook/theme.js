/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { create } from '@storybook/theming/create';

/**
 * @see https://storybook.js.org/docs/react/configure/theming
 */
export default create({
  base: 'dark',

  // Typography
  fontBase: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
  fontCode:
    "'IBM Plex Mono', Menlo, 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier, monospace",

  brandTitle: '@carbon/vue3',
  brandUrl:
    'https://github.com/carbon-design-system/carbon-components-vue/tree/main',
  brandTarget: '_blank',
  // brandImage: 'https://storybook.js.org/images/placeholders/350x150.png',
});
