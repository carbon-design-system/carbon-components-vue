<template>
  <div :class="`cv-text-area ${carbonPrefix}--form-item`">
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
