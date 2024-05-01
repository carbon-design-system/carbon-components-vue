<template>
  <cds-button v-bind="props">
    <slot />
  </cds-button>
</template>

<script setup>
import '@carbon/web-components/es/components/button/index.js';
import {
  BUTTON_KIND,
  BUTTON_TOOLTIP_ALIGNMENT,
  BUTTON_TOOLTIP_POSITION,
  BUTTON_TYPE,
  BUTTON_SIZE,
} from '@carbon/web-components/es/components/button/button';
const props = defineProps({
  /**
   * `true` if the button should have input focus when the page loads.
   */
  autofocus: { type: Boolean },
  /**
   * `true` if the button is being used within a data table batch action toolbar
   */
  batchAction: { type: Boolean },
  /**
   * Specify an optional className to be added to your Button
   */
  buttonClassName: { type: String, default: undefined },
  /**
   * Specify the message read by screen readers for the danger button variant
   */
  dangerDescriptor: { type: String, default: undefined },
  /**
   * `true` if the button should be disabled.
   */
  disabled: { type: Boolean },
  /**
   * The default file name, used if this button is rendered as `<a>`.
   */
  download: { type: String, default: undefined },
  /**
   * `true` if there is a non-icon content.
   */
  hasMainContent: { type: Boolean },
  /**
   * Link `href`. If present, this button is rendered as `<a>`.
   */
  href: { type: String, default: undefined },
  /**
   * The language of what `href` points to, if this button is rendered as `<a>`.
   */
  hreflang: { type: String, default: undefined },
  /**
   * `true` if expressive theme enabled.
   */
  isExpressive: { type: Boolean },
  /**
   * Specify whether the Button is currently selected.
   * Only applies to the Ghost variant.
   */
  isSelected: { type: Boolean },
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
   * The a11y role for `<a>`.
   */
  linkRole: { type: String, default: undefined },
  /**
   * Boolean to determine if tooltip is open.
   */
  openTooltip: { type: Boolean },
  /**
   * URLs to ping, if this button is rendered as `<a>`.
   */
  ping: { type: String, default: undefined },
  /**
   * The link type, if this button is rendered as `<a>`.
   */
  rel: { type: String, default: undefined },
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
  /**
   * The link target, if this button is rendered as `<a>`.
   */
  target: { type: String, default: undefined },
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
});
</script>
