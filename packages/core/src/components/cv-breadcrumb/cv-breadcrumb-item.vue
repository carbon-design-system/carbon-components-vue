<template>
  <div :class="`cv-breadcrumb-item ${carbonPrefix}--breadcrumb-item`">
    <slot></slot>
  </div>
</template>

<script>
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';
export default {
  name: 'CvBreadcrumbItem',
  mixins: [carbonPrefixMixin],
};
</script>
