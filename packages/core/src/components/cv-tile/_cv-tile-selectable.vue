<template>
  <label
    :data-wibble="`${isChecked}`"
    :for="uid"
    aria-label="tile"
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
      <CheckmarkFilled16 v-if="componentsX" />
      <svg v-else width="16" height="16" viewBox="0 0 16 16" fill-rule="evenodd">
        <path
          d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM6.7 11.5L3.4 8.1l1.4-1.4 1.9 1.9 4.1-4.1 1.4 1.4-5.5 5.6z"
        ></path>
      </svg>
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
import { componentsX } from '../../internal/feature-flags';
import CheckmarkFilled16 from '@carbon/icons-vue/lib/checkmark--filled/16';

export default {
  name: 'CvTileSelectable',
  mixins: [uidMixin, checkMixin],
  components: { CheckmarkFilled16 },
  inheritAttrs: false,
  data() {
    return { componentsX };
  },
};
</script>
