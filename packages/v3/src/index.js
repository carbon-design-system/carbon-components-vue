const ctx = require.context(
  './components/',
  true,
  /^(?!.*(?:\/_|\.stories\.vue|\.test\.vue|\.spec\.vue)).*\.vue$/
);
const components = ctx.keys().map(ctx);

// Export the components as a plugin
export default {
  // options is an array of components to be registered
  // e.g. ['c-button', 'c-modal']
  install(Vue, options) {
    if (typeof options === 'undefined') {
      for (let c of components) {
        Vue.component(c.default.name, c.default);
      }
    } else {
      if (!(options instanceof Array)) {
        throw new TypeError('options must be an array');
      }

      for (let c of components) {
        // register only components specified in the options
        if (options.includes(c.default.name)) {
          Vue.component(c.default.name, c.default);
        }
      }
    }
  },
};

// import/export individual components
export { CvAccordion, CvAccordionItem } from './components/CvAccordion';
export { CvButton, CvIconButton, CvButtonSet } from './components/CvButton';
