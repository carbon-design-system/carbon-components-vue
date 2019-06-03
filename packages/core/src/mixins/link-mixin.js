export default {
  computed: {
    tagType() {
      // if to is used and not href then user wanted a router-link
      return this.$attrs.to && !this.$attrs.href ? 'router-link' : 'a';
    },
  },
};
