// This directive determines calls the associated method if a click happens outside of el

const handlerMap = new WeakMap();

export default {
  bind(el, binding, vnode) {
    if (!el.clickOutsideBlur) {
      el.clickOutsideBlur = function(blurEv) {
        // neither element or child of
        if (!handlerMap.has(el)) {
          handlerMap.set(el, clickoutEv => {
            // neither element or child of
            if (!(el == clickoutEv.target || el.contains(clickoutEv.target))) {
              // call method
              vnode.context[binding.expression](clickoutEv);
            }
          });
          document.body.addEventListener('click', handlerMap.get(el));
        }
      };

      el.addEventListener('focusout', el.clickOutsideBlur);
    }
  },
  unbind(el) {
    handlerMap.delete(el);
    el.removeEventListener('focusout', el.clickOutsideBlur);
  },
};
