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
    <div :class="[`${carbonPrefix}--text-input__field-wrapper`]">
      <input
        :class="[`${carbonPrefix}--text-input`]"
        type="text"
        :value="modelValue"
        @input="$event => $emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';

const props = defineProps({
  label: String,
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);
</script>
