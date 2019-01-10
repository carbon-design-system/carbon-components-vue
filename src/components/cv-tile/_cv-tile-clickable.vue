<template>
  <a
    data-tile="clickable"
    class="cv-tile-clickable bx--tile--clickable"
    tabindex="0"
  >
    <slot></slot>
  </a>
</template>

<script>
import { Tile } from 'carbon-components';

export default {
  name: 'CvTileClickable',
  mounted() {
    this.carbonComponent = Tile.create(this.$el);
  },
  beforeDestroy() {
    this.carbonComponent.release();
  },
};
</script>

<style lang="scss"></style>
