<template>
  <ul data-accordion class="bx--accordion">
    <slot></slot>
  </ul>
</template>

<script>
import { Accordion } from 'carbon-components';

export default {
  name: 'CvAccordion',
  data() {
    return {
      carbonComponent: null,
    };
  },
  methods: {
    register() {
      if (!this.carbonComponent) {
        this.carbonComponent = Accordion.create(this.$el);
      }
    },
  },
  beforeDestroy() {
    this.carbonComponent.release();
  },
};
</script>

<style lang="scss">
// Import Style Definitions
@import '~carbon-components/scss/components/accordion/accordion';
</style>
