/// <reference path="index.d.ts" />
const ctx = require.context(
  './components/',
  true,
  /^(?!.*(?:\/_|\.stories\.vue|\.test\.vue|\.spec\.vue)).*\.vue$/
);
const components = ctx.keys().map(k => {
  const fn = k.split('/').slice(-1)[0];
  const compName = fn.slice(0, -4);
  return { name: compName, component: ctx(k) };
});

// Export the components as a plugin
export default {
  // options is an array of components to be registered
  // e.g. ['c-button', 'c-modal']

  /**
   * @typedef {import("vue").App} App
   */

  /**
   * Install plugin in Vue
   * @param {App} Vue
   * @param {Array<string>} options
   */
  install(Vue, options) {
    if (typeof options === 'undefined') {
      for (let c of components) {
        Vue.component(c.name, c.component.default);
      }
    } else {
      if (!(options instanceof Array)) {
        throw new TypeError('options must be an array');
      }

      for (let c of components) {
        // register only components specified in the options
        if (options.includes(c.name)) {
          Vue.component(c.name, c.component.default);
        }
      }
    }
  },
};
