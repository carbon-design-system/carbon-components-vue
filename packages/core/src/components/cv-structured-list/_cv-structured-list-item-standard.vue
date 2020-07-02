<template>
  <div :class="`cv-structured-list-item--standard ${carbonPrefix}--structured-list-row`">
    <slot></slot>
  </div>
</template>

<script>
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';
export default {
  name: 'CvStructuredListItemStandard',
  mixins: [carbonPrefixMixin],
};
</script>
