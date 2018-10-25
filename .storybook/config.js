import { configure } from '@storybook/vue';

import Vue from 'vue';
import VueHighlightJS from 'vue-highlightjs';

import CarbonComponentsVue from '../src';

Vue.use(CarbonComponentsVue);
Vue.use(VueHighlightJS);

function loadStories() {
  const req = require.context('../src/components', true, /\-story\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
