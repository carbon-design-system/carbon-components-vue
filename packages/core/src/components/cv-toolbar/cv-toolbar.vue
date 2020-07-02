<template>
  <div :class="`${carbonPrefix}--toolbar`" data-toolbar>
    <slot></slot>
  </div>
</template>

<script>
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';
export default {
  name: 'CvToolbar',
  mixins: [carbonPrefixMixin],
};
</script>
