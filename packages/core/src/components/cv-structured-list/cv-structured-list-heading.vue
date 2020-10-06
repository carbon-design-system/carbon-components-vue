<template>
  <div :class="`cv-structured-list-heading ${carbonPrefix}--structured-list-th`">
    <slot></slot>
  </div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvStructuredListHeading',
  mixins: [carbonPrefixMixin],
};
</script>
