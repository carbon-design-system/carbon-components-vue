<template>
  <div :class="`cv-radio-group ${carbonPrefix}--form-item`">
    <div
      :class="[`${carbonPrefix}--radio-button-group`, { [`${carbonPrefix}--radio-button-group--vertical`]: vertical }]"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvRadioGroup',
  mixins: [carbonPrefixMixin],
  props: {
    vertical: Boolean,
  },
  mounted() {
    // pass on cv-radio-button change events
    this.$on('cv:change', val => this.$emit('change', val));
  },
};
</script>
