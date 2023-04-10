<template>
  <div
    :class="[
      'cv-text-input',
      `${carbonPrefix}--form-item`,
      `${carbonPrefix}--text-input-wrapper`,
    ]"
  >
    <label :for="cvId" :class="[`${carbonPrefix}--label`]">
      {{ label }}
    </label>
    <div :class="[`${carbonPrefix}--text-input__field-wrapper`]">
      <input
        :id="cvId"
        :class="[`${carbonPrefix}--text-input`]"
        v-bind="$attrs"
        type="text"
        :value="modelValue"
        @input="$event => $emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { useCvId, props as propsCvId } from '../../use/cvId';

const props = defineProps({
  label: String,
  modelValue: String,
  ...propsCvId,
});

const cvId = useCvId(props);
const emit = defineEmits(['update:modelValue']);
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>
