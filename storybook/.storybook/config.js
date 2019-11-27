import { configure, addDecorator, addParameters } from '@storybook/vue';
import { themes } from '@storybook/theming';
import { withOptions } from '@storybook/addon-options';
import { withNotes } from '@storybook/addon-notes';
import { withKnobs } from '@storybook/addon-knobs';

import Vue from 'vue';
import VueHighlightJS from 'vue-highlightjs';
import '!style-loader!css-loader!postcss-loader!sass-loader!./styles.scss';

addDecorator(
  withOptions({
    name: `carbon components vue`,
    // sortStoriesByKind: true,
    url: 'https://github.com/carbon-design-system/carbon-components-vue/blob/master/packages/core/README.md',
    // hierarchyRootSeparator: /\|/,
  })
);

addDecorator(withKnobs);
addDecorator(withNotes);

addParameters({
  options: {
    theme: themes.dark,
    isToolshown: true,
    showPanel: true,
  },
});

Vue.use(VueHighlightJS);

function loadStories() {
  const req = require.context('../stories', true, /\-story\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
