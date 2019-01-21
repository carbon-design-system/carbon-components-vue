<template>
  <div class="cv-radio-group bx--form-item">
    <div class="bx--radio-button-group"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 'CvRadioGroup',
  methods: {
    onItemChange(val) {
      this.$emit('change', val);
    },
  },
};
</script>
