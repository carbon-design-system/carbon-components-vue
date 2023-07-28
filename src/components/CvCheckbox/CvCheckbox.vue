<template>
  <div
    class="cv-checkbox"
    :class="[
      `${carbonPrefix}--checkbox--${inline ? 'inline' : 'wrapper'}`,
      { [`${carbonPrefix}--form-item`]: formItem },
    ]"
  >
    <input
      ref="input"
      v-bind="$attrs"
      type="checkbox"
      :class="`${carbonPrefix}--checkbox`"
      :checked="isChecked === true"
      :aria-checked="`${isChecked}`"
      @focus="onFocus"
      @blur="onBlur"
      @change="onChange"
      :value="value"
      :id="cvId"
    /><label
      :for="cvId"
      :class="[
        `${carbonPrefix}--checkbox-label`,
        {
          [`${carbonPrefix}--label--disabled`]: disabled,
          [`${carbonPrefix}--checkbox-label__focus`]: hasFocus,
        },
      ]"
      ><span
        :class="[
          `${carbonPrefix}--checkbox-label-text`,
          { [`${carbonPrefix}--visually-hidden`]: hideLabel },
        ]"
        dir="auto"
        >{{ label }}</span
      ></label
    >
  </div>
</template>

<script setup>
// noinspection ES6PreferShortImport
import { carbonPrefix } from '../../global/settings';
import { ref, toRefs } from 'vue';
import { useCheck, props as propsCvCheck } from '../../use/cvCheck';
import { useCvId, props as propsCvId } from '../../use/cvId';

const props = defineProps({
  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: { type: Boolean, default: null },
  /**
   * Provide a label to provide a description of the Checkbox input that you are exposing to the user
   */
  label: { type: String, default: null },
  /**
   * Specify whether the "bx--form-item" style should be applied
   */
  formItem: { type: Boolean, default: true },
  /**
   * Specify whether the "bx--checkbox--inline" style should be applied
   */
  inline: { type: Boolean, default: false },
  /**
   * Specify whether the Checkbox should be disabled
   */
  disabled: { type: Boolean, default: false },
  ...propsCvCheck,
  ...propsCvId,
});

// Track focus
let hasFocus = ref(false);
function onFocus() {
  hasFocus = true;
}
function onBlur() {
  hasFocus = false;
}

const cvId = useCvId(props);

const emit = defineEmits(['update:modelValue', 'change']);
const { onChange, isChecked } = useCheck(toRefs(props), emit);
</script>
