<template>
  <button disabled :class="buttonClassOpts({ skeleton: true })" type="button"></button>
</template>

<script>
import buttonMixin from './button-mixin';

export default {
  name: 'CvButtonSkeleton',
  mixins: [buttonMixin],
};
</script>
