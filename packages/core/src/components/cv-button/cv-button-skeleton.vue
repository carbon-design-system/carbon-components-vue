<template>
  <button disabled :class="buttonClasses" type="button"></button>
</template>

<script>
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';
import buttonMixin from './button-mixin';

export default {
  name: 'CvButtonSkeleton',
  mixins: [buttonMixin, carbonPrefixMixin],
  computed: {
    buttonClasses() {
      return this.buttonClassOpts({ skeleton: true });
    },
  },
};
</script>
