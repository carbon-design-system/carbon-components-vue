<template>
  <cds-button v-bind="props">
    <cv-svg slot="icon" alt="" :svg="icon" />
  </cds-button>
</template>

<script setup>
import CvSvg from '../CvSvg/_CvSvg.vue';
import {
  BUTTON_KIND,
  BUTTON_TOOLTIP_ALIGNMENT,
  BUTTON_TOOLTIP_POSITION,
  BUTTON_TYPE,
  BUTTON_SIZE,
} from '@carbon/web-components/es/components/button/button';

const props = defineProps({
  /** Icon to display. `import { Bee20 } from '@carbon/icons-vue';` */
  icon: { type: Object, required: true },
  /**
   * Specify the alignment of the tooltip to the icon-only button.
   * Can be one of: start, center, or end.
   */
  tooltipAlignment: {
    type: String,
    default: undefined,
    /** @param {string} value */
    validator(value) {
      return Object.values(BUTTON_TOOLTIP_ALIGNMENT).includes(value);
    },
  },
  /**
   * Specify the direction of the tooltip for icon-only buttons.
   * Can be either top, right, bottom, or left.
   */
  tooltipPosition: {
    type: String,
    default: undefined,
    /** @param {string} value */
    validator(value) {
      return Object.values(BUTTON_TOOLTIP_POSITION).includes(value);
    },
  },
  /**
   * Specify the direction of the tooltip for icon-only buttons.
   * Can be either top, right, bottom, or left.
   */
  tooltipText: { type: String, default: undefined },
  /**
   * Button kind.
   */
  kind: {
    type: String,
    default: BUTTON_KIND.PRIMARY,
    /** @param {string} value */
    validator(value) {
      return Object.values(BUTTON_KIND).includes(value);
    },
  },
  /**
   * Button type.
   */
  type: {
    type: String,
    default: undefined,
    /** @param {string} value */
    validator(value) {
      return Object.values(BUTTON_TYPE).includes(value);
    },
  },
  /**
   * Button size.
   */
  size: {
    type: String,
    default: undefined,
    /** @param {string} value */
    validator(value) {
      return Object.values(BUTTON_SIZE).includes(value);
    },
  },
});
</script>
