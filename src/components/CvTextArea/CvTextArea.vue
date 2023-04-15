<template>
  <div :class="`cv-text-area ${carbonPrefix}--form-item`">
    <label :for="cvId" :class="[`${carbonPrefix}--label`]">
      {{ label }}
    </label>
    <div :class="`${carbonPrefix}--text-area__wrapper`">
      <textarea
        :class="[`${carbonPrefix}--text-area`]"
        :value="modelValue"
        :id="cvId"
        @input="$event => $emit('update:modelValue', $event.target.value)"
      ></textarea>
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
</script>
