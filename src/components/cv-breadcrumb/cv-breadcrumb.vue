<template>
  <nav
    class="bx--breadcrumb"
    :class="{'bx--breadcrumb--no-trailing-slash': noTrailingSlash}"
    aria-label="breadcrumb">
    <slot></slot>
  </nav>
</template>

<script>
export default {
  name: 'CvBreadcrumb',
  props: {
    noTrailingSlash: Boolean,
  },
};
</script>

<style lang="scss">
@import '~carbon-components/scss/components/breadcrumb/breadcrumb';
</style>
