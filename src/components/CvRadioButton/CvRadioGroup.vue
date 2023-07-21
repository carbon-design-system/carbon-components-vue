<template>
  <div :class="`cv-radio-group ${carbonPrefix}--form-item`">
    <div
      :class="[
        `${carbonPrefix}--radio-button-group`,
        { [`${carbonPrefix}--radio-button-group--vertical`]: vertical },
      ]"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { provide } from 'vue';
import { carbonPrefix } from '../../global/settings';

defineProps({
  vertical: Boolean,
});

const emit = defineEmits(['change']);

provide('onRadioItemChange', clickedItemCvId => {
  emit('change', clickedItemCvId);
});
</script>
