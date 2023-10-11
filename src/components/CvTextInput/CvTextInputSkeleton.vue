<template>
  <div :class="[`${carbonPrefix}--form-item`]">
    <span
      :class="[`${carbonPrefix}--label`, `${carbonPrefix}--skeleton`]"
    ></span>
    <div
      :class="[`${carbonPrefix}--text-input`, `${carbonPrefix}--skeleton`]"
    ></div>
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
</script>
