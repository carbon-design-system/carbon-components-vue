<template>
  <div
    class="cv-grid"
    :class="[
      `${carbonPrefix}--grid`,
      {
        [`${carbonPrefix}--grid--full-width`]: fullWidth,
        [`${carbonPrefix}--grid--condensed`]: kind === 'condensed',
        [`${carbonPrefix}--grid--narrow`]: kind === 'narrow',
      },
    ]"
  >
    <slot></slot>
  </div>
</template>

<script>
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';

export default {
  name: 'CvGrid',
  mixins: [carbonPrefixMixin],
  props: {
    fullWidth: Boolean,
    kind: {
      type: String,
      default: 'wide',
      validator: val => ['wide', 'narrow', 'condensed'].includes(val),
    },
  },
};
</script>
