<template>
  <button class="cv-button" :class="buttonClassOpts()" v-on="inputListeners" role="button">
    <slot></slot>

    <CvSvg v-if="icon || iconHref" :svg="icon || iconHref" :class="`${carbonPrefix}--btn__icon`" />
  </button>
</template>

<script>
import buttonMixin from './button-mixin';
import { carbonPrefixMixin } from '../../mixins';
import CvSvg from '../cv-svg/_cv-svg';

export default {
  name: 'CvButton',
  mixins: [buttonMixin, carbonPrefixMixin],
  components: { CvSvg },
};
</script>
