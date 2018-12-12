<template>
  <div
    data-tile="expandable"
    class="cv-tile-expandable bx--tile--expandable"
    tabindex="0"
    :class="[{'bx--tile--is-expanded': expanded}]"
  >
    <button class="bx--tile__chevron">
      <svg width="12" height="8" viewBox="0 0 12 8" fill-rule="evenodd">
        <path d="M10.6 0L6 4.7 1.4 0 0 1.4l6 6.1 6-6.1z"></path>
      </svg>
    </button>
    <div class="bx--tile-content">
      <span data-tile-atf class="bx--tile-content__above-the-fold">
        <slot>
          <!-- Above the fold content here -->
        </slot>
      </span>
      <span class="bx--tile-content__below-the-fold">
        <slot name="below">
          <!-- Rest of the content here -->
        </slot>
      </span>
    </div>
  </div>
</template>

<script>
import { Tile } from 'carbon-components';

export default {
  name: 'CvTileExpandable',
  props: {
    expanded: Boolean,
  },
  mounted() {
    this.carbonComponent = Tile.create(this.$el);

    try {
      // Tile does not resize correctly if initially expanded
      // Issue - https://github.com/carbon-design-system/carbon-components/issues/781
      this.carbonComponent._setTileHeight();
    } catch (e) {
      console.log('Unable to set tile height');
    }
  },
  beforeDestroy() {
    this.carbonComponent.release();
  },
};
</script>

<style lang="scss">
</style>
