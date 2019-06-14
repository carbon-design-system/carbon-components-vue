<template>
  <ul class="cv-side-nav-items bx--side-nav__items">
    <slot />
  </ul>
</template>

<script>
export default {
  name: 'CvSideNavItems',
};
</script>

<style lang="scss">
.cv-side-nav-items {
  pointer-events: none;

  * {
    pointer-events: initial;
  }
}
</style>
