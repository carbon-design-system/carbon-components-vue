<template>
  <div :class="[`${carbonPrefix}--form-item`]">
    <label
      v-if="!hideLabel"
      :class="[`${carbonPrefix}--label`, `${carbonPrefix}--skeleton`]"
    ></label>
    <div
      :class="[`${carbonPrefix}--text-input`, `${carbonPrefix}--skeleton`]"
    ></div>
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';

defineProps({ hideLabel: { type: Boolean, default: false } });
</script>
