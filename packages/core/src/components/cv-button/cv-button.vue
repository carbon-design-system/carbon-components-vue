<template>
  <button
    class="cv-button"
    :class="[
      `${carbonPrefix}--btn`,
      `${carbonPrefix}--btn--` + kind.toLowerCase(),
      {
        'bx--btn--sm': size === 'small' || (size === undefined && small),
        'bx--btn--field': size === 'field',
      },
    ]"
    v-on="inputListeners"
    role="button"
  >
    <slot></slot>

    <component v-if="typeof icon === 'object'" :is="icon" class="bx--btn__icon" />
    <svg v-if="typeof icon === 'string' || iconHref" class="bx--btn__icon">
      <use :href="icon || iconHref" />
    </svg>
  </button>
</template>

<script>
import buttonMixin from './button-mixin';
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';

export default {
  name: 'CvButton',
  mixins: [buttonMixin, carbonPrefixMixin],
  computed: {
    buttonClasses() {
      return `${carbonPrefix}--btn` ,
      `${carbonPrefix}--btn--` + kind.toLowerCase(),
      {
        'bx--btn--sm': size === 'small' || (size === undefined && small),
        'bx--btn--field': size === 'field',
      },
    }
  }
};
</script>
