<template>
  <nav
    class="cv-breadcrumb bx--breadcrumb"
    :class="{ 'bx--breadcrumb--no-trailing-slash': noTrailingSlash }"
    :aria-label="ariaLabel"
  >
    <slot></slot>
  </nav>
</template>

<script>
export default {
  name: 'CvBreadcrumb',
  props: {
    ariaLabel: { type: String, default: 'breadcrumb' },
    noTrailingSlash: Boolean,
  },
};
</script>
