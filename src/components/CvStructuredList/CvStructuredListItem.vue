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
import { computed, inject, provide, watch } from 'vue';
import CvStructuredListItemStandard from './CvStructuredListItemStandard.vue';
import CvStructuredListItemSelectable from './CvStructuredListItemSelectable.vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
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
    ? CvStructuredListItemSelectable
    : CvStructuredListItemStandard;
});

const emit = defineEmits(['change']);

provide('onRadioItemChange', clickedItemCvId => {
  emit('change', clickedItemCvId);
  change(clickedItemCvId); //emit to parent
});

watch(
  () => props.modelValue,
  val => {
    console.log('WATCH modelValue: ', {
      val,
    });
  }
);
watch(
  () => props.value,
  val => {
    console.log('WATCH value: ', {
      val,
    });
  }
);
</script>
