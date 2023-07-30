<template>
  <div class="cv-number-input" :class="`${carbonPrefix}--form-item`">
    <label :class="`${carbonPrefix}--label ${carbonPrefix}--skeleton`" />
    <div :class="`${carbonPrefix}--number ${carbonPrefix}--skeleton`" />
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
</script>
