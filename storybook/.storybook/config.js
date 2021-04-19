import { configure, addDecorator, addParameters } from '@storybook/vue';
import { themes } from '@storybook/theming';
import { withNotes } from '@storybook/addon-notes';
import { withKnobs } from '@storybook/addon-knobs';

import Vue from 'vue';
import VueHighlightJS from 'vue-highlightjs';
import '!style-loader!css-loader!postcss-loader!sass-loader!./styles.scss';

addDecorator(withKnobs);
addDecorator(withNotes);

addParameters({
  options: {
    name: 'Carbon Components in Vue.js',
    url: 'https://github.com/carbon-design-system/carbon-components-vue/blob/main/packages/core/README.md',
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
