<template>
  <button disabled :class="buttonClassOpts({ skeleton: true })" type="button"></button>
</template>

<script>
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';
import buttonMixin from './button-mixin';

export default {
  name: 'CvButtonSkeleton',
  mixins: [buttonMixin, carbonPrefixMixin],
};
</script>
