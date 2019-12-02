<template>
  <button class="cv-button" :class="buttonClasses" v-on="inputListeners" role="button">
    <slot></slot>

    <component v-if="typeof icon === 'object'" :is="icon" class="bx--temp-fix" :class="`${carbonPrefix}--btn__icon`" />
    <svg v-if="typeof icon === 'string' || iconHref" :class="`${carbonPrefix}--btn__icon`">
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
      let classes = [`${this.carbonPrefix}--btn`, `${this.carbonPrefix}--btn--${this.kind.toLowerCase()}`];

      if (this.size === 'small' || (this.size === undefined && this.small)) {
        classes.push(`${this.carbonPrefix}--btn--sm`);
      }
      if (this.size === 'field') {
        classes.push(`${this.carbonPrefix}--btn--field`);
      }
      return classes;
    },
  },
};
</script>
