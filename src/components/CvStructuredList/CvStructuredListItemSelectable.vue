<template>
  <label
    :for="cvId"
    :aria-label="label"
    :class="[
      `cv-structured-list-item--selectable ${carbonPrefix}--structured-list-row`,
      { ' ${carbonPrefix}--structured-list-row--selected': isChecked },
    ]"
    tabindex="0"
  >
    <slot></slot>
    <input
      v-bind="$attrs"
      :id="cvId"
      tabindex="-1"
      :class="`${carbonPrefix}--structured-list-input`"
      :checked="isChecked"
      :value="value"
      type="radio"
      @change="onChange"
    />
    <div :class="`${carbonPrefix}--structured-list-td`">
      <CheckmarkFilled16 :class="`${carbonPrefix}--structured-list-svg`" />
    </div>
  </label>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { useCvId, propsCvId, useRadio } from '../../use';
import CheckmarkFilled16 from '@carbon/icons-vue/es/checkmark--filled/16';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  label: {
    type: String,
    default: undefined,
  },
  modelValue: {
    type: String,
    default: undefined,
  },
  value: {
    type: String,
    default: undefined,
  },
  ...propsCvId,
});

const cvId = useCvId(props);
const emit = defineEmits(['update:modelValue', 'change']);
const { isChecked, onChange } = useRadio(props, emit);
</script>
