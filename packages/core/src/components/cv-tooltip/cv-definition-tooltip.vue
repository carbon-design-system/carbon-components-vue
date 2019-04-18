<template>
  <div class="cv-definition-tooltip bx--tooltip--definition">
    <p class="bx--tooltip__trigger" tabindex="0">{{ term }}</p>
    <div :class="`bx--tooltip--definition__${direction}`">
      <span class="bx--tooltip__caret"></span>
      <p>{{ definition }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CvDefinitionTooltip',
  props: {
    definition: { type: String, required: true },
    direction: {
      type: String,
      default: 'top',
      validator(val) {
        const validValues = ['top', 'bottom'];
        const valid = validValues.includes(val);
        if (!valid) {
          console.warn(`CVDefinitionTooltip.direction must be one of the following: ${validValues}`);
        }
        return valid;
      },
    },
    term: { type: String, required: true },
  },
};
</script>
