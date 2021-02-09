<template>
  <button
    :class="[
      buttonClasses,
      `${carbonPrefix}--tooltip__trigger`,
      `${carbonPrefix}--tooltip--a11y`,
      `${carbonPrefix}--tooltip--${tipPosition || 'bottom'}`,
      `${carbonPrefix}--tooltip--align-${tipAlignment || 'center'}`,
    ]"
    :disabled="disabled || skeleton"
  >
    <span :class="`${carbonPrefix}--assistive-text`">{{ label }}</span>

    <cv-svg v-if="icon" :svg="icon" :class="`${carbonPrefix}--btn__icon`" />
  </button>
</template>

<script>
import { carbonPrefix } from '../../global/settings';
import {
  props as commonCvButtonProps,
  useCvButtonCommon,
} from './CvButtonCommon';
import CvSvg from '../CvSvg/_CvSvg';

const { disabled, icon, kind, size } = commonCvButtonProps;

export default {
  name: 'CvIconButton',
  components: { CvSvg },
  props: {
    disabled,
    icon,
    kind,
    label: { type: String, default: undefined },
    size,
    tipPosition: {
      type: String,
      default: 'bottom',
      validator: val => ['top', 'left', 'bottom', 'right'.includes(val)],
    },
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

<style lang="scss"></style>
