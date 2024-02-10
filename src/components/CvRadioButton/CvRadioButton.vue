<template>
  <div
    :class="[
      `cv-radio-button ${carbonPrefix}--radio-button-wrapper`,
      { [`${carbonPrefix}--radio-button-wrapper--label-left`]: labelLeft },
    ]"
  >
    <input
      v-bind="$attrs"
      :id="cvId"
      ref="input"
      :checked="isChecked"
      :class="`${carbonPrefix}--radio-button`"
      type="radio"
      :value="value"
      @change="onChange"
    />
    <!-- symbol causes problem in codepen? -->
    <label :for="cvId" :class="`${carbonPrefix}--radio-button__label`">
      <span :class="`${carbonPrefix}--radio-button__appearance`"></span>
      <span :class="{ [`${carbonPrefix}--visually-hidden`]: hideLabel }">
        {{ label }}
      </span>
    </label>
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { useCvId, propsCvId, useMethods, useRadio } from '../../use';

const props = defineProps({
  modelValue: { type: String, default: undefined },
  checked: Boolean,
  label: {
    type: String,
    default: null,
    required: true,
    validator: label => !!label.length,
  },
  value: { type: String, required: true },
  hideLabel: Boolean,
  labelLeft: Boolean,
  ...propsCvId,
});

const cvId = useCvId(props);

const emit = defineEmits(['update:modelValue', 'change']);

useMethods({ input: ['blur', 'focus'] });
const { isChecked, onChange } = useRadio(props, emit);
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>
