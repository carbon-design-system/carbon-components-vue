<template>
  <label
    :data-wibble="`${isChecked}`"
    :for="uid"
    :aria-label="ariaLabel"
    :class="[
      `cv-tile-selectable ${carbonPrefix}--tile--selectable`,
      { [`${carbonPrefix}--tile--is-selected`]: isChecked },
    ]"
    data-tile="selectable"
    tabindex="0"
    :data-contained-checkbox-state="isChecked"
    ref="target"
  >
    <input
      tabindex="-1"
      data-tile-input
      :id="uid"
      type="checkbox"
      :checked="isChecked"
      :class="`${carbonPrefix}--tile-input`"
      v-bind="$attrs"
      v-on="inputListeners"
    />
    <div :class="`${carbonPrefix}--tile__checkmark`">
      <CheckmarkFilled16 />
    </div>
    <div :class="`${carbonPrefix}--tile-content`">
      <slot>
        <!-- Tile content here -->
      </slot>
    </div>
  </label>
</template>

<script>
import { uidMixin, checkMixin, carbonPrefixMixin, methodsMixin } from '../../mixins';
import CheckmarkFilled16 from '@carbon/icons-vue/es/checkmark--filled/16';

export default {
  name: 'CvTileSelectable',
  mixins: [uidMixin, checkMixin, carbonPrefixMixin, methodsMixin({ target: ['blur', 'focus'] })],
  components: { CheckmarkFilled16 },
  inheritAttrs: false,
  props: {
    ariaLabel: { type: String, default: 'tile' },
  },
};
</script>
