<template>
  <button
    :class="[
      buttonClasses,
      `${carbonPrefix}--tooltip__trigger`,
      `${carbonPrefix}--tooltip--a11y`,
      `${carbonPrefix}--tooltip--${tipPosition || 'bottom'}`,
      `${carbonPrefix}--tooltip--align-${tipAlignment || 'center'}`,
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <span :class="`${carbonPrefix}--assistive-text`">{{ label }}</span>

    <slot name="icon">
      <cv-svg :svg="icon" :class="`${carbonPrefix}--btn__icon`" />
    </slot>
  </button>
</template>

<script>
import { carbonPrefix } from '../../global/settings';
import {
  props as commonCvButtonProps,
  useCvButtonCommon,
} from './CvButtonCommon';
import CvSvg from '../CvSvg/_CvSvg.vue';

const { disabled, icon, kind, size } = commonCvButtonProps;

export default {
  name: 'CvIconButton',
  components: { CvSvg },
  emits: ['click'], // emitted to allow testing of click
  props: {
    // Docgen comments added for storybook doc page
    /**
     * disabled by property or if skeleton
     */
    disabled,
    /**
     * \@carbon/icons-vue icon, href, svg or symbol
     */
    icon,
    /**
     * Carbon button kind
     */
    kind,
    /**
     * label displayed as a tooltip for the icon
     */
    label: { type: String, default: undefined },
    /**
     * Size of the button
     */
    size,
    /**
     * tipPosition as per CvTooltip
     */
    tipPosition: {
      type: String,
      default: 'bottom',
      validator: val => ['top', 'left', 'bottom', 'right'.includes(val)],
    },
    /**
     * tipAlignment as per CvTooltip
     */
    tipAlignment: {
      type: String,
      default: 'center',
      validator: val => ['start', 'center', 'end'].includes(val),
    },
  },
  setup(props) {
    const { buttonClasses } = useCvButtonCommon(
      props.kind,
      props.size,
      false,
      true
    );

    return {
      buttonClasses,
      carbonPrefix,
    };
  },
};
</script>
