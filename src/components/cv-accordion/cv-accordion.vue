<template>
  <ul data-accordion class="cv-accordion bx--accordion">
    <slot></slot>
  </ul>
</template>

<script>
import { Accordion } from 'carbon-components';

export default {
  name: 'CvAccordion',
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
</style>
