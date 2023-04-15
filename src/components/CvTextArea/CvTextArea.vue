<template>
  <div :class="`cv-text-area ${carbonPrefix}--form-item`">
    <label :class="[`${carbonPrefix}--label`]">
      {{ label }}
    </label>
    <div :class="`${carbonPrefix}--text-area__wrapper`">
      <textarea
        :class="[`${carbonPrefix}--text-area`]"
        :value="modelValue"
        @input="$event => $emit('update:modelValue', $event.target.value)"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';

const props = defineProps({
  label: String,
  modelValue: String,
});
</script>
