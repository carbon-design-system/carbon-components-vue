<template>
  <button
    class="cv-button bx--btn bx--btn--icon-only"
    :class="[
      'bx--btn--' + kind.toLowerCase(),
      tipClasses,
      {
        'bx--btn--sm': size === 'small' || (size === undefined && small),
        'bx--btn--field': size === 'field',
      },
    ]"
    v-on="$listeners"
    role="button"
  >
    <span class="bx--assistive-text">{{ tipText }}</span>

    <component v-if="typeof icon === 'object'" :is="icon" class="bx--btn__icon" />
    <svg v-if="typeof icon === 'string' || iconHref" class="bx--btn__icon">
      <use :href="icon || iconHref" />
    </svg>
  </button>
</template>

<script>
import buttonMixin from './button-mixin';

export default {
  name: 'CvIconButton',
  mixins: [buttonMixin],
  props: {
    tipText: { type: String, default: undefined },
    tipPosition: {
      type: String,
      default: 'bottom',
      validator: val => ['top', 'left', 'bottom', 'right'.includes(val)],
    },
    tipAlignment: { type: String, default: 'center' },
  },
  computed: {
    tipClasses() {
      const tipPosition = this.tipPosition || 'bottom';
      const tipAlignment = this.tipAlignment || 'center';
      if (this.tipText) {
        return `bx--tooltip__trigger bx--tooltip--a11y bx--tooltip--${tipPosition} bx--tooltip--align-${tipAlignment}`;
      } else {
        return '';
      }
    },
  },
};
</script>
