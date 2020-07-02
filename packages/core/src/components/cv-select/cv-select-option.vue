<template>
  <option :class="`cv-select-option ${carbonPrefix}--select-option`">
    <slot></slot>
  </option>
</template>

<script>
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';
export default {
  name: 'CvSelectOption',
  mixins: [carbonPrefixMixin],
  // HTML props disabled selected hidden
};
</script>
