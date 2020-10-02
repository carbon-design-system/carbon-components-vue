<template>
  <ul :class="`cv-side-nav-items ${carbonPrefix}--side-nav__items`" @mousedown="onMousedown">
    <slot />
  </ul>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvSideNavItems',
  mixins: [carbonPrefixMixin],
  methods: {
    onMousedown(ev) {
      if (ev.target === this.$el) {
        // non-css fix for #448
        ev.preventDefault();
      }
    },
  },
};
</script>
