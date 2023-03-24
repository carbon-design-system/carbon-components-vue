<template>
  <bx-selectable-tile
    :color-scheme="light ? 'light' : undefined"
    :checkmark-label="checkmarkLabel"
    :name="name"
    :value="value"
    :selected="internalSelected"
    @bx-selectable-tile-changed="onChange"
  >
    <slot></slot>
  </bx-selectable-tile>
</template>

<script setup>
import '@carbon/web-components/es/components/tile/index.js';
import { onMounted, ref, watch } from 'vue';
const props = defineProps({
  /**
   * Color scheme regular or light
   */
  light: { type: Boolean, default: false },
  /**
   * Hover text for the check mark
   */
  checkmarkLabel: { type: String, default: '' },
  /**
   * name property on <input> tag
   */
  name: { type: String, default: 'selectable-tile' },
  /**
   * value property on <input> tag
   */
  value: { type: String, default: '' },
  /**
   * Tile is selected (checked). Available as v-model:selected="selected".
   */
  selected: { type: Boolean, default: false },
});
const internalSelected = ref(props.selected);
onMounted(() => (internalSelected.value = props.selected));
watch(
  () => props.selected,
  () => (internalSelected.value = props.selected)
);

const emit = defineEmits(['change', 'update:selected']);
function onChange(ev) {
  internalSelected.value = ev?.target?.selected;
  emit('update:selected', internalSelected.value);
  emit('change', internalSelected.value);
}
</script>
