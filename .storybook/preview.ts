// export const parameters = {
//   does not really work for Vue as it adds onClick as a property
//   actions: { argTypesRegex: '^on[A-Z].*' },
//   actions: { argTypesRegex: '^(v-on:)|(@)[a-zA-Z].*' },
// };
import './styles.scss';

import { configureActions } from '@storybook/addon-actions';
import { white, g10, g90, g100 } from '@carbon/themes';
import { breakpoints } from '@carbon/layout';
import theme from './theme';

const preview = {
  parameters: {
    docs: {
      theme: theme,
    },
  },
}
// export default preview

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Set the localization for the storybook',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        {
          right: '🇺🇸',
          title: 'English',
          value: 'en',
        },
        {
          right: '🇵🇸',
          title: 'Arabic',
          value: 'ar',
        },
      ],
    },
  },
  theme: {
    name: 'Theme',
    description: 'Set the global theme for displaying components',
    defaultValue: 'white',
    toolbar: {
      icon: 'paintbrush',
      items: ['white', 'g10', 'g90', 'g100'],
    },
  },
};

export const parameters = {
  backgrounds: {
    // https://storybook.js.org/docs/react/essentials/backgrounds#grid
    grid: {
      cellSize: 8,
      opacity: 0.5,
    },
    values: [
      {
        name: 'white',
        value: white.background,
      },
      {
        name: 'g10',
        value: g10.background,
      },
      {
        name: 'g90',
        value: g90.background,
      },
      {
        name: 'g100',
        value: g100.background,
      },
    ],
  },
  controls: {
    // https://storybook.js.org/docs/react/essentials/controls#show-full-documentation-for-each-property
    expanded: true,

    // https://storybook.js.org/docs/react/essentials/controls#specify-initial-preset-color-swatches
    // presetColors: [],

    // https://storybook.js.org/docs/react/essentials/controls#sorting-controls
    sort: 'alpha',

    hideNoControlsWarning: true,
  },
  darkMode: {
    current: 'light',
  },
  docs: {
    theme,
  },
  // Small (<672)
  // Medium (672 - 1056px)
  // Large (1056 - 1312px)
  // X-Large (1312 - 1584px)
  // Max (>1584)
  viewport: {
    viewports: {
      sm: {
        name: 'Small',
        styles: {
          width: breakpoints.sm.width,
          height: '100%',
        },
      },
      md: {
        name: 'Medium',
        styles: {
          width: breakpoints.md.width,
          height: '100%',
        },
      },
      lg: {
        name: 'Large',
        styles: {
          width: breakpoints.lg.width,
          height: '100%',
        },
      },
      xlg: {
        name: 'X-Large',
        styles: {
          width: breakpoints.xlg.width,
          height: '100%',
        },
      },
      Max: {
        name: 'Max',
        styles: {
          width: breakpoints.max.width,
          height: '100%',
        },
      },
    },
  },
};
export default parameters;

configureActions({
  clearOnStoryChange: true,
  limit: 10,
});
export const decorators = [
  (story, context) => ({
    data() {
      const { locale, theme } = context.globals;
      return {
        locale,
        theme,
      };
    },
    components: { story },
    template:
      '<div :data-carbon-theme="theme" :lang="locale" class="cv-vue-3"><story /></div>',
  }),
];
