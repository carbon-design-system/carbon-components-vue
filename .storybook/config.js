import { configure } from '@storybook/vue';
import { setOptions } from '@storybook/addon-options';

import Vue from 'vue';
import VueHighlightJS from 'vue-highlightjs';

import CarbonComponentsVue from '../src';

setOptions({
  name: `carbon components vue`,
  url: 'https://github.com/carbon-design-system/carbon-components-vue',
});

Vue.use(CarbonComponentsVue);
Vue.use(VueHighlightJS);

function loadStories() {
  const req = require.context('../src/components', true, /\-story\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
