<template>
  <ul class="cv-side-nav-items bx--side-nav__items" @mousedown="onMousedown">
    <slot />
  </ul>
</template>

<script>
export default {
  name: 'CvSideNavItems',
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
