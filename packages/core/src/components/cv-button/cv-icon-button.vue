<template>
  <button class="cv-button" :class="buttonClasses" v-on="inputListeners" type="button">
    <span :class="`${carbonPrefix}--assistive-text`">{{ label }}</span>

    <CvSvg v-if="icon || iconHref" :svg="icon || iconHref" :class="`${carbonPrefix}--btn__icon`" />
  </button>
</template>

<script>
import buttonMixin from './button-mixin';
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';
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
  computed: {
    buttonClasses() {
      return `${this.buttonClassOpts({ iconOnly: true })}${this.tipClasses}`;
    },
    tipClasses() {
      const tipPosition = this.tipPosition || 'bottom';
      const tipAlignment = this.tipAlignment || 'center';
      if (this.label) {
        return ` ${this.carbonPrefix}--tooltip__trigger ${this.carbonPrefix}--tooltip--a11y ${this.carbonPrefix}--tooltip--${tipPosition} ${this.carbonPrefix}--tooltip--align-${tipAlignment}`;
      } else {
        return '';
      }
    },
  },
};
</script>
