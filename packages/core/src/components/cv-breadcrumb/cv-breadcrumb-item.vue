<template>
  <div
    class="cv-breadcrumb-item bx--breadcrumb-item"
    :class="{ 'bx--breadcrumb-item--current': activePage }"
    :aria-current="ariaCurrent"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CvBreadcrumbItem',
  props: {
    active: Boolean,
    ariaCurrent: String,
  },
  computed: {
    activePage() {
      return this.active && this.ariaCurrent !== 'page';
    },
  },
};
</script>
