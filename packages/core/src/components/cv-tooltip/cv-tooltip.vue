<template>
  <button
    class="cv-tooltip bx--tooltip__trigger bx--tooltip--a11y"
    :class="`bx--tooltip--${direction} bx--tooltip--align-${alignment}`"
    type="button"
  >
    <span class="bx--assistive-text">{{ tip }}</span>
    <slot>
      <Information16 />
    </slot>
  </button>
</template>

<script>
import Information16 from '@carbon/icons-vue/es/information/16';

export default {
  name: 'CvTooltip',
  components: { Information16 },
  props: {
    alignment: { type: String, default: 'center', validator: val => ['start', 'center', 'end'].includes(val) },
    direction: {
      type: String,
      default: 'top',
      validator(val) {
        const validValues = ['top', 'left', 'right', 'bottom'];
        const valid = validValues.includes(val);
        if (!valid) {
          console.warn(`CVTooltip.direction must be one of the following: ${validValues}`);
        }
        return valid;
      },
    },
    tip: { type: String, required: true },
  },
};
</script>
