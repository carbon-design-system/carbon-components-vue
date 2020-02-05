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
      return this.buttonClassOpts();
    },
  },
};
</script>
