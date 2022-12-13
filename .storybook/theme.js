import { create } from '@storybook/theming';

const theme = create({
  base: 'dark',
  colorPrimary: '#8a3ffc', // purple 60
  colorSecondary: '#78a9ff', // blue 40
  appBg: '#262626', // gray 90
  barBg: '#e0e0e0', // gray 20
  barTextColor: '#161616', // gray 100
  barSelectedColor: '#0f62fe', // blue 60
  inputBg: '#262626',
  inputBorder: '#0f62fe',
  brandTitle: '@carbon/vue3',
  brandUrl:
    'https://github.com/carbon-design-system/carbon-components-vue/tree/main/packages/v3',
  fontBase: '"IBM Plex Sans", "Helvetica Neue", Arial, sans-serif',
  fontCode:
    '"IBM Plex Mono", "Menlo", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", Courier, monospace',
  brandTarget: '_blank',
});
export default theme;
