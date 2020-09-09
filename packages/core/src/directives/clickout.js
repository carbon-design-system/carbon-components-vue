// This directive determines calls the associated method if a click happens outside of el

export default {
  bind(el, binding, vnode) {
    el.clickOutHandler = function(event) {
      // neither element or child of
      if (!(el == event.target || el.contains(event.target))) {
        // call method
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutHandler);
  },
  unbind(el) {
    document.body.removeEventListener('click', el.clickOutHandler);
  },
};
