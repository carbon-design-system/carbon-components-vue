<template>
  <div :class="`${carbonPrefix}--form-item`">
    <label :class="`${carbonPrefix}--label ${carbonPrefix}--skeleton`" />
    <div :class="`${carbonPrefix}--text-area ${carbonPrefix}--skeleton`" />
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
</script>
