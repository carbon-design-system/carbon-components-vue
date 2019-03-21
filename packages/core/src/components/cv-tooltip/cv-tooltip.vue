<template>
  <div class="cv-tooltip bx--tooltip--icon">
    <div tabindex="0" class="bx--tooltip__trigger" :class="`bx--tooltip--icon__${direction}`" :aria-label="tip">
      <slot>
        <Information16 v-if="componentsX" />
        <svg v-else width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <g fill-rule="evenodd">
            <path
              d="M8 14.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"
              fill-rule="nonzero"
            ></path>
            <path fill-rule="nonzero" d="M9 13H7V7h2z"></path>
            <circle cx="8" cy="4" r="1"></circle>
          </g>
        </svg>
      </slot>
    </div>
  </div>
</template>

<script>
import { componentsX } from '../../_internal/_feature-flags';
import Information16 from '@carbon/icons-vue/lib/information/16';

export default {
  name: 'CvTooltip',
  components: { Information16 },
  data() {
    return { componentsX };
  },
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

<style lang="scss"></style>
