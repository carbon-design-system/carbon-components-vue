<template>
  <component
    :is="tagType"
    v-bind="$attrs"
    class="cv-structured-list-item"
    :value="value"
    :modelValue="modelValue"
  >
    <slot></slot>
  </component>
</template>

<script setup>
import { computed, inject, provide } from 'vue';
import CvStructuredListItemStandard from './CvStructuredListItemStandard.vue';
import CvStructuredListItemSelectable from './CvStructuredListItemSelectable.vue';

defineOptions({
  inheritAttrs: false,
});

defineProps({
  modelValue: {
    type: String,
    default: undefined,
  },
  value: {
    type: String,
    default: undefined,
  },
});

const selectable = inject('selectable');
const change = inject('change');
const emit = defineEmits(['change']);

provide('onRadioItemChange', clickedItemCvId => {
  emit('change', clickedItemCvId);
  change(clickedItemCvId); //emit to parent
});

const tagType = computed(() => {
  return selectable
    ? CvStructuredListItemSelectable
    : CvStructuredListItemStandard;
});
</script>
