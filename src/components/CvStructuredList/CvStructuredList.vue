<template>
  <div
    :class="[
      `${carbonPrefix}--structured-list`,
      {
        [`${carbonPrefix}--structured-list--selection`]: selectable,
        [`${carbonPrefix}--structured-list--condensed`]: condensed,
      },
    ]"
    :data-structured-list="selectable"
  >
    <div :class="`${carbonPrefix}--structured-list-thead`">
      <div
        :class="`${carbonPrefix}--structured-list-row ${carbonPrefix}--structured-list-row--header-row`"
      >
        <slot name="headings"></slot>
        <div
          v-if="selectable"
          :class="`${carbonPrefix}--structured-list-th`"
        ></div>
      </div>
    </div>
    <div :class="`${carbonPrefix}--structured-list-tbody`">
      <slot name="items"></slot>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, provide } from 'vue';
import { carbonPrefix } from '../../global/settings';

const props = defineProps({
  selectable: Boolean,
  condensed: Boolean,
});

const emit = defineEmits(['change']);

provide('change', val => {
  console.log('CvStructuredListItem change: ', {
    val,
  });
  emit('change', val);
});
provide('selectable', props.selectable);
</script>
