<template>
  <div class="cv-interactive-tooltip">
    <div class="bx--tooltip__label" :aria-describedby="uid">
      <slot name="label"></slot>

      <div
        tabindex="0"
        data-tooltip-trigger
        :data-tooltip-target="`#${uid}`"
        role="tooltip"
        class="bx--tooltip__trigger"
        ref="trigger"
      >
        <slot name="trigger">
          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
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
    <div :id="uid" :data-floating-menu-direction="direction" class="bx--tooltip">
      <span class="bx--tooltip__caret"></span>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import { Tooltip } from 'carbon-components';

export default {
  name: 'CvInteractiveTooltip',
  mixins: [uidMixin],
  props: {
    direction: {
      type: String,
      default: 'top',
      validator(val) {
        const validValues = ['top', 'bottom', 'right', 'left'];
        const valid = validValues.includes(val);
        if (!valid) {
          console.warn(
            `CVInteractiveTooltip.direction must be one of the following: ${validValues}`
          );
        }
        return valid;
      },
    },
  },
  methods: {
    show: function() {
      this.carbonComponent.show();
    },
    hide: function() {
      this.carbonComponent.hide();
    },
  },
  mounted() {
    this.carbonComponent = Tooltip.create(this.$refs.trigger);
  },
  beforeDestroy() {
    this.carbonComponent.release();
    // ensure popup destroyed
    const popupEl = document.getElementById(this.uid);
    if (popupEl) {
      popupEl.parentElement.removeChild(popupEl);
    }
  },
};
</script>

<style lang="scss">
</style>
