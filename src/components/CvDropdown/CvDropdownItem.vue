<!--
  Carbon dropdown item

  Attributes:
    value: The value for the item. Optional.

  Usage:
  See dropdown.vue

-->

<template>
  <li
    data-option
    :data-value="value"
    :class="[
      `cv-dropdown-item ${carbonPrefix}--dropdown-item`,
      { [`${carbonPrefix}--dropdown--selected`]: dataSelected },
    ]"
    role="menuitem"
  >
    <a
      :aria-checked="dataSelected"
      :class="`${carbonPrefix}--dropdown-link`"
      href="javascript:void(0)"
      ref="link"
      role="menuitemradio"
      tabindex="-1"
    >
      <slot></slot>
    </a>
  </li>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { inject, onBeforeUnmount, onMounted, ref, watch } from 'vue';
const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  selected: { type: Boolean, default: false },
});
const dataSelected = ref(props.selected);
/**
 * @type {Ref<string>}
 */
const parentSelected = inject('dropdown-selected');
/**
 * @type {Ref<string>}
 */
const parentFocus = inject('dropdown-focus');
const parentCaption = inject('dropdown-caption');
watch(
  () => props.selected,
  () => {
    dataSelected.value = props.selected;
  }
);
watch(parentSelected, () => {
  dataSelected.value = props.value === parentSelected.value;
});
const link = ref(null);
watch(parentFocus, () => {
  if (props.value === parentFocus.value) link.value?.focus();
});
watch(dataSelected, val => {
  if (val) {
    parentSelected.value = props.value;
    parentCaption.value = link.value?.innerHTML || props.value;
  }
});
const parentList = inject('dropdown-items');
onMounted(() => {
  dataSelected.value = props.value === parentSelected.value;
  parentList.value?.push({
    value: props.value,
    selected: props.selected,
  });
});
onBeforeUnmount(() => {
  const index = parentList.value?.findIndex(item => item.value === props.value);
  if (index > -1) parentList.value?.splice(index, 1);
});
</script>
