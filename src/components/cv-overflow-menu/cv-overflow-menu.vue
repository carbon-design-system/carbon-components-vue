<template>
  <div
    data-overflow-menu
    tabindex="0"
    :aria-label="label"
    class="cv-overflow-menu bx--overflow-menu"
  >
    <svg class="bx--overflow-menu__icon" width="3" height="15" viewBox="0 0 3 15">
      <g fill-rule="evenodd">
        <circle cx="1.5" cy="1.5" r="1.5"></circle>
        <circle cx="1.5" cy="7.5" r="1.5"></circle>
        <circle cx="1.5" cy="13.5" r="1.5"></circle>
      </g>
    </svg>
    <ul
      class="bx--overflow-menu-options"
      :class="{
        'bx--overflow-menu--flip': flipMenu
      }"
      tabindex="-1"
    >
      <slot></slot>
    </ul>
  </div>
</template>

<script>
import { OverflowMenu } from 'carbon-components';

export default {
  name: 'CvOverflowMenu',
  props: {
    label: String,
    flipMenu: Boolean,
    offset: {
      type: Object,
      validator(value) {
        return value.hasOwnProperty('left') && value.hasOwnProperty('top');
      },
    },
  },
  mounted() {
    let options = {};
    if (this.offset) {
      if (this.flipMenu) {
        options.objMenuOffsetFlip = this.offset;
      } else {
        options.objMenuOffset = this.offset;
      }
    }

    this.carbonComponent = OverflowMenu.create(this.$el, options);
  },
  beforeDestroy() {
    this.carbonComponent.release();
  },
};
</script>

<style lang="scss">
</style>
