import { create } from '@storybook/theming';

import packageInfo from '../../packages/core/package.json';
const { name, version } = packageInfo;

export default create({
  base: 'dark',
  brandTitle: `${name} v${version}`,
  brandUrl: 'https://github.com/carbon-design-system/carbon-components-vue/tree/main/packages/core',
  // brandImage: 'https://placehold.it/350x150',
});
