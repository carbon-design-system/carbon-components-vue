<template>
  <div
    :class="[
      'cv-text-input',
      `${carbonPrefix}--form-item`,
      `${carbonPrefix}--text-input-wrapper`,
    ]"
  >
    <label :class="[`${carbonPrefix}--label`]">
      {{ label }}
    </label>
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';

const props = defineProps({
  label: String,
});
</script>
