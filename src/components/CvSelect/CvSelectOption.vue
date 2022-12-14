<template>
  <option
    :data-initial-selected="isSelected"
    :class="`cv-select-option ${carbonPrefix}--select-option`"
  >
    <slot></slot>
  </option>
</template>

<script setup>
import { carbonPrefix } from '@/global/settings';
import { computed, useAttrs } from 'vue';
const attrs = useAttrs();
const isSelected = computed(() => {
  const selected = attrs['selected'];
  if (typeof selected === 'string')
    return selected !== 'false' ? true : undefined;
  if (typeof selected === 'boolean') return selected ? true : undefined;

  return selected ? true : undefined;
});
</script>
