<template>
  <div class="cv-checkbox" :class="`${carbonPrefix}--form-item ${carbonPrefix}--checkbox-wrapper`">
    <label :class="`${carbonPrefix}--checkbox-label ${carbonPrefix}--skeleton`">
      <span :class="`${carbonPrefix}--checkbox-label-text ${carbonPrefix}--skeleton`"></span>
    </label>
  </div>
</template>

<script>
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';
export default {
  name: 'CvCheckboxSkeleton',
  mixins: [carbonPrefixMixin],
};
</script>
