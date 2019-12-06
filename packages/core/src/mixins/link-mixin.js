export default {
  props: {
    disabled: Boolean,
    to: { type: [String, Object] },
    href: String,
  },
  computed: {
    tagType() {
      // if to is used and not href then user wanted a router-link
      return this.to && !this.href ? 'router-link' : 'a';
    },
    linkProps() {
      if (this.disabled) {
        return {
          'aria-disabled': true,
        };
      } else if (this.to && !this.href) {
        return { to: this.to };
      }
      return { href: this.href };
    },
  },
};
