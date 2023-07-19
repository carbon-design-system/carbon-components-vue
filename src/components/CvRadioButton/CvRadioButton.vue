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
      :checked="isChecked"
      :class="`${carbonPrefix}--radio-button`"
      ref="input"
      type="radio"
      :value="value"
      @change="onChange"
    />
    <!-- symbol causes problem in codepen? -->
    <label :for="cvId" :class="`${carbonPrefix}--radio-button__label`">
      <span :class="`${carbonPrefix}--radio-button__appearance`"></span>
      <span
        v-if="label"
        :class="{ [`${carbonPrefix}--visually-hidden`]: hideLabel }"
      >
        {{ label }}
      </span>
    </label>
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { useCvId, props as propsCvId, useMethods, useRadio } from '../../use';

const props = defineProps({
  modelValue: String,
  checked: Boolean,
  label: String,
  value: { type: String, required: true },
  hideLabel: Boolean,
  labelLeft: Boolean,
  ...propsCvId,
});

const cvId = useCvId(props);
useMethods({ input: ['blur', 'focus'] });
const { isChecked, onChange } = useRadio(props);
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>
