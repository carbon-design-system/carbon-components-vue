export default {
  name: 'CvSelectFromItem',
  props: {
    formItem: { type: Boolean, default: true },
  },
  render(createElement) {
    if (this.formItem) {
      return createElement(
        'div',
        {
          class: 'bx--form-item',
        },
        this.$slots.default
      );
    } else {
      return this.$slots.default;
    }
  },
};
