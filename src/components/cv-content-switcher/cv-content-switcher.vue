<template>
  <div data-content-switcher class="bx--content-switcher"
    v-on="$listeners"
    >
    <slot></slot>
  </div>
</template>

<script>
import { ContentSwitcher } from 'carbon-components';

export default {
  name: 'CvContentSwitcher',
  data() {
    return {
      carbonComponent: null,
    };
  },
  mounted() {
    this.carbonComponent = ContentSwitcher.create(this.$el);
  },
  beforeDestroy() {
    this.carbonComponent.release();
  },
};
</script>

<style lang="scss">
</style>
