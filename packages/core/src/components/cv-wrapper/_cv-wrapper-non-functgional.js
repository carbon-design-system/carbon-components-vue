/*
 * This component optionally wraps slotted content with the specified tag-type.
 *
 * If no tag-type is supplied then the slotted content is unwrapped.
 *
 *  Unwrapped slots do not recieve class, style or attributes attached to the wrapper
 */
export default {
  name: 'CvWrapperNonFunctional',
  inheritAttrs: false, // prevent attributes being applied to unwrapped slot
  props: {
    tagType: { type: String, default: null },
  },
  render(createElement) {
    if (this.tagType) {
      return createElement(
        this.tagType,
        {
          attrs: this.$attrs,
          on: this.$listeners,
        },
        this.$slots.default
      );
    } else {
      // do not apply class and style to slot
      this.$vnode.data.staticClass = '';
      this.$vnode.data.class = '';
      this.$vnode.data.staticStyle = {};
      this.$vnode.data.style = {};

      return this.$slots.default;
    }
  },
};
