<template>
  <div class="cv-tooltip bx--tooltip--icon">
    <div tabindex="0" class="bx--tooltip__trigger" :class="`bx--tooltip--icon__${direction}`" :aria-label="tip">
      <slot>
        <Information16 />
      </slot>
    </div>
  </div>
</template>

<script>
import Information16 from '@carbon/icons-vue/es/information/16';

export default {
  name: 'CvTooltip',
  components: { Information16 },
  props: {
    direction: {
      type: String,
      default: 'top',
      validator(val) {
        const validValues = ['top', 'bottom'];
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
