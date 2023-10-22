<template>
  <label
    :for="uid"
    :aria-label="ariaLabel"
    :class="[
      `cv-tile-selectable ${carbonPrefix}--tile--selectable`,
      { [`${carbonPrefix}--tile--is-selected`]: isChecked },
    ]"
    data-tile="selectable"
    tabindex="0"
    :data-contained-checkbox-state="isChecked || null"
  >
    <input
      :id="uid"
      tabindex="-1"
      data-tile-input
      type="checkbox"
      :checked="isChecked === true"
      :aria-checked="`${isChecked}`"
      :class="`${carbonPrefix}--tile-input`"
      v-bind="$attrs"
      @change="onChange"
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

<script setup>
import { carbonPrefix } from '../../global/settings';
import { props as propsCvCheck, useCheck } from '../../use/cvCheck';
import { props as propsCvId, useCvId } from '../../use/cvId';
import CheckmarkFilled16 from '@carbon/icons-vue/es/checkmark--filled/16';
import { toRefs } from 'vue';

const props = defineProps({
  ariaLabel: { type: String, default: 'tile' },
  ...propsCvCheck,
  ...propsCvId,
});

const uid = useCvId(props, true);

const emit = defineEmits(['update:modelValue', 'change']);
const { onChange, isChecked } = useCheck(toRefs(props), emit);
</script>
