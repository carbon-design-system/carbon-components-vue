<template>
  <div class="cv-definition-tooltip bx--tooltip--definition bx--tooltip--a11y">
    <button
      :aria-describedby="`${uid}-label`"
      class="bx--tooltip__trigger bx--tooltip--a11y bx--tooltip__trigger--definition"
      :class="`bx--tooltip--${direction} bx--tooltip--align-${alignment}`"
      type="button"
    >
      {{ term }}
    </button>
    <div class="bx--assistive-text" :id="`${uid}-label`" role="tooltip">{{ definition }}</div>
  </div>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';

export default {
  name: 'CvDefinitionTooltip',
  mixins: [uidMixin],
  props: {
    alignment: { type: String, default: 'center', validator: val => ['start', 'center', 'end'].includes(val) },
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
