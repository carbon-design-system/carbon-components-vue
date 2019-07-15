<template>
  <div class="cv-radio-group bx--form-item">
    <div class="bx--radio-button-group" :class="{ 'bx--radio-button-group--vertical': vertical }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CvRadioGroup',
  props: {
    vertical: Boolean,
  },
  mounted() {
    // pass on cv-radio-button change events
    this.$on('cv:change', val => this.$emit('change', val));
  },
};
</script>
