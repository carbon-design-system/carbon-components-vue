<template>
  <nav
    class="cv-breadcrumb bx--breadcrumb"
    :class="{'bx--breadcrumb--no-trailing-slash': noTrailingSlash}"
    aria-label="breadcrumb"
  >
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
</style>
