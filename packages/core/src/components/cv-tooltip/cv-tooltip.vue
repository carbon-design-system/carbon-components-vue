<template>
  <button
    :class="[
      `cv-tooltip`,
      `${carbonPrefix}--tooltip__trigger`,
      `${carbonPrefix}--tooltip--a11y`,
      `${carbonPrefix}--tooltip--${direction}`,
      `${carbonPrefix}--tooltip--align-${alignment}`,
    ]"
    type="button"
  >
    <span :class="`${carbonPrefix}--assistive-text`">{{ tip }}</span>
    <slot>
      <Information16 />
    </slot>
  </button>
</template>

<script>
import Information16 from '@carbon/icons-vue/es/information/16';
import { carbonPrefixMixin } from '../../mixins';

export default {
  name: 'CvTooltip',
  mixins: [carbonPrefixMixin],
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
