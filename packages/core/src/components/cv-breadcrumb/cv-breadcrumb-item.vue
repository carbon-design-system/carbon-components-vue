<template>
  <div :class="breadcrumbItemClasses" :aria-current="ariaCurrent">
    <slot></slot>
  </div>
</template>

<script>
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';
export default {
  name: 'CvBreadcrumbItem',
  mixins: [carbonPrefixMixin],
  props: {
    active: Boolean,
    ariaCurrent: String,
  },
  computed: {
    activePage() {
      return this.active && this.ariaCurrent !== 'page';
    },
    breadcrumbItemClasses() {
      const classes = [`cv-breadcrumb-item ${this.carbonPrefix}--breadcrumb-item`];
      if (this.activePage) {
        classes.push(`${this.carbonPrefix}--breadcrumb-item--current`);
      }
      return classes.join(' ');
    },
  },
};
</script>
