<template>
  <button
    class="cv-button"
    :class="[
      ...buttonClassOpts({ iconOnly: true }),
      `${carbonPrefix}--tooltip__trigger`,
      `${carbonPrefix}--tooltip--a11y`,
      `${carbonPrefix}--tooltip--${tipPosition || 'bottom'}`,
      `${carbonPrefix}--tooltip--align-${tipAlignment || 'center'}`,
    ]"
    v-on="inputListeners"
    type="button"
  >
    <span :class="`${carbonPrefix}--assistive-text`">{{ label }}</span>

    <CvSvg v-if="icon || iconHref" :svg="icon || iconHref" :class="`${carbonPrefix}--btn__icon`" />
  </button>
</template>

<script>
import buttonMixin from './button-mixin';
import { carbonPrefixMixin } from '../../mixins';
import CvSvg from '../cv-svg/_cv-svg';

export default {
  name: 'CvIconButton',
  mixins: [buttonMixin, carbonPrefixMixin],
  components: { CvSvg },
  props: {
    label: { type: String, default: undefined },
    tipPosition: {
      type: String,
      default: 'bottom',
      validator: val => ['top', 'left', 'bottom', 'right'.includes(val)],
    },
    tipAlignment: { type: String, default: 'center', validator: val => ['start', 'center', 'end'].includes(val) },
  },
};
</script>
