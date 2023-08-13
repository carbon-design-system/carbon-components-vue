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
import { computed } from 'vue';
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

const tagType = computed(() => {
  return selectable
    ? CvStructuredListItemStandard
    : CvStructuredListItemSelectable;
});

const emit = defineEmits(['change']);

provide('on', val => {
  emit('change', val);
  change(val); //emit to parent
});
</script>
