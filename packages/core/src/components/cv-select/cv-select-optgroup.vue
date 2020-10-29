<template>
  <optgroup :class="`cv-select-optgroup ${carbonPrefix}--select-optgroup`">
    <slot></slot>
  </optgroup>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvSelectOptgroup',
  mixins: [carbonPrefixMixin],
  // html props: label
};
</script>
