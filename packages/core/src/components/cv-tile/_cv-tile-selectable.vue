<template>
  <label
    :data-wibble="`${isChecked}`"
    :for="uid"
    :aria-label="ariaLabel"
    class="cv-tile-selectable bx--tile--selectable"
    :class="{ 'bx--tile--is-selected': isChecked }"
    data-tile="selectable"
    tabindex="0"
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
      v-on="inputListeners"
    />
    <div class="bx--tile__checkmark">
      <CheckmarkFilled16 />
    </div>
    <div class="bx--tile-content">
      <slot>
        <!-- Tile content here -->
      </slot>
    </div>
  </label>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import checkMixin from '../../mixins/check-mixin';
import CheckmarkFilled16 from '@carbon/icons-vue/es/checkmark--filled/16';

export default {
  name: 'CvTileSelectable',
  mixins: [uidMixin, checkMixin],
  components: { CheckmarkFilled16 },
  inheritAttrs: false,
  props: {
    ariaLabel: { type: String, default: 'tile' },
  },
};
</script>
