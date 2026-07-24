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

/** @type {import('@storybook/vue3').Preview['globalTypes']} */
const globalTypes = {
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

/** @type {import('@storybook/vue3').Preview['parameters']} */
const parameters = {
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
  // Make the default layout fullscreen, so components can use the entire space for the story
  // otherwise they will "flick" when growing/shrinking based on display
  layout: 'fullscreen',
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
  options: {
    /**
     *
     * @param {import('storybook/internal/types').IndexEntry} storyA
     * @param {import('storybook/internal/types').IndexEntry} storyB
     */
    storySort: (storyA, storyB) => {
      // "title" contains the full path, like "Component/CvAccordion"; although Welcome does not have a `X/` part...
      // So we try to extract this first classification from it.
      // And then we weight these to compare. Lower weights goes first.
      const storyANamespace = storyA.title.split('/')[0] ?? storyA.title;
      const storyBNamespace = storyB.title.split('/')[0] ?? storyB.title;

      const namespaceWeight = {
        'Welcome': 1,
        'Components': 2,
        // EverythingElse: 99
      };

      const namespaceCompare = (namespaceWeight[storyANamespace] ?? 99) - (namespaceWeight[storyBNamespace] ?? 99);
      if (namespaceCompare !== 0) {
        return namespaceCompare; // They have different weights, so go with it.
      }

      // Both are in the same namespace weight, try by name "name" contains the final name of the page (e.g. "Default")
      const nameWeight = {
        'Docs': 1,
        'Default': 2,
        // EverythingElse: 99
      };

      const nameOrder = (nameWeight[storyA.name] ?? 99) - (nameWeight[storyB.name] ?? 99);
      if (nameOrder !== 0) {
        return nameOrder; // They have different weights, go with it.
      }

      // We couldn't match by any other option, so order the name alphabetically.
      return storyA.name.localeCompare(storyB.name);
    }
  },
};

configureActions({
  clearOnStoryChange: true,
  limit: 10,
});

/** @type {import('@storybook/vue3').Preview['decorators']} */
const decorators = [
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

/** @type {import('@storybook/vue3').Preview} */
const preview = {
  globalTypes,
  parameters,
  decorators,
};
export default preview;

