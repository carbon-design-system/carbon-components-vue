<template>
  <div class="cv-number-input" :class="`${carbonPrefix}--form-item`">
    <label :class="`${carbonPrefix}--label ${carbonPrefix}--skeleton`" />
    <div :class="`${carbonPrefix}--number ${carbonPrefix}--skeleton`" />
  </div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvNumberInputSkeleton',
  mixins: [carbonPrefixMixin],
};
</script>
