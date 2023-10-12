<template>
  <div :class="[`${carbonPrefix}--form-item`]">
    <span
      v-if="!hideLabel"
      :class="[`${carbonPrefix}--label`, `${carbonPrefix}--skeleton`]"
    ></span>
    <div
      :class="[`${carbonPrefix}--text-input`, `${carbonPrefix}--skeleton`]"
    ></div>
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';

defineProps({ hideLabel: { type: Boolean, default: false } });
</script>
