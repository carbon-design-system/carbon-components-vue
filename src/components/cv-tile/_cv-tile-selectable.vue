<template>
  <label
    :for="uid"
    aria-label="tile"
    class="cv-tile-selectable bx--tile--selectable"
    data-tile="selectable"
    tabindex="0"
    :class="[{ 'bx--tile--is-selected': isChecked }]"
    :data-contained-checkbox-state="isChecked"
  >
    <input
      tabindex="-1"
      data-tile-input
      :id="uid"
      type="checkbox"
      :checked="isChecked"
      class="bx--tile-input"
      v-bind="$attrs"
    />
    <div class="bx--tile__checkmark">
      <svg width="16" height="16" viewBox="0 0 16 16" fill-rule="evenodd">
        <path
          d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM6.7 11.5L3.4 8.1l1.4-1.4 1.9 1.9 4.1-4.1 1.4 1.4-5.5 5.6z"
        ></path>
      </svg>
    </div>
    <div class="bx--tile-content">
      <slot> <!-- Tile content here --> </slot>
    </div>
  </label>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import checkMixin from '../../mixins/check-mixin';

export default {
  name: 'CvTileSelectable',
  mixins: [uidMixin, checkMixin],
  inheritAttrs: false,
};
</script>

<style lang="scss"></style>
