<template>
  <div className="cv-radio-group bx--form-item">
    <div class="bx--radio-button-group">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CvRadioGroup',
  mounted() {
    // listen children to raise change events
    for (let child of this.$children) {
      if (child.constructor.options.name === 'CvRadioButton') {
        child.$on('change', ev => {
          this.$emit('change', ev.target.value);
        });
      }
    }
  },
};
</script>
