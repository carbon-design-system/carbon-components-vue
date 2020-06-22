<template>
  <nav class="cv-breadcrumb" :class="breadcrumbClasses" :aria-label="ariaLabel">
    <slot></slot>
  </nav>
</template>

<script>
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';
export default {
  name: 'CvBreadcrumb',
  mixins: [carbonPrefixMixin],
  props: {
    ariaLabel: { type: String, default: 'breadcrumb' },
    noTrailingSlash: Boolean,
  },
  computed: {
    breadcrumbClasses() {
      let classes = [`${this.carbonPrefix}--breadcrumb`];
      if (this.noTrailingSlash) {
        classes.push(`${this.carbonPrefix}--breadcrumb--no-trailing-slash`);
      }
      return classes;
    },
  },
};
</script>
