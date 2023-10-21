<template>
  <div
    :class="[
      'cv-text-input',
      `${carbonPrefix}--form-item`,
      `${carbonPrefix}--text-input-wrapper`,
      { [`${carbonPrefix}--password-input-wrapper`]: isPassword },
    ]"
  >
    <label
      :for="cvId"
      :class="[
        `${carbonPrefix}--label`,
        {
          [`${carbonPrefix}--label--disabled`]: $attrs.disabled,
          [`${carbonPrefix}--visually-hidden`]: hideLabel,
        },
      ]"
    >
      {{ label }}
    </label>
    <div
      :class="[
        `${carbonPrefix}--text-input__field-wrapper`,
        { [`${carbonPrefix}--text-input__field-wrapper--warning`]: isWarn },
      ]"
      :data-invalid="isInvalid || null"
    >
      <WarningFilled16
        v-if="isInvalid"
        :class="`${carbonPrefix}--text-input__invalid-icon`"
      />
      <WarningAltFilled16
        v-if="isWarn"
        :class="`${carbonPrefix}--text-input__invalid-icon ${carbonPrefix}--text-input__invalid-icon--warning`"
      />
      <input
        :id="cvId"
        ref="input"
        :class="[
          `${carbonPrefix}--text-input`,
          {
            [`${carbonPrefix}--text-input--invalid`]: isInvalid,
            [`${carbonPrefix}--text-input--light`]: isLight,
            [`${carbonPrefix}--text-input--warning`]: isWarn,
            [`${carbonPrefix}--password-input`]: isPassword,
          },
        ]"
        v-bind="$attrs"
        :type="dataType"
        :value="modelValue"
        :data-toggle-password-visibility="isPassword || null"
        @input="$event => $emit('update:modelValue', $event.target.value)"
      />
      <button
        v-if="isPassword"
        :class="[
          `${carbonPrefix}--btn`,
          `${carbonPrefix}--btn--icon-only`,
          `${carbonPrefix}--text-input--password__visibility__toggle`,
          `${carbonPrefix}--tooltip__trigger`,
          `${carbonPrefix}--tooltip--a11y`,
          `${carbonPrefix}--tooltip--bottom`,
          `${carbonPrefix}--tooltip--align-center`,
          { [`${carbonPrefix}--btn--disabled`]: $attrs.disabled },
        ]"
        type="button"
        :disabled="$attrs.disabled"
        @click="togglePasswordVisibility"
      >
        <span :class="`${carbonPrefix}--assistive-text`">
          {{ passwordHideShowLabel }}
        </span>
        <ViewOff16
          v-if="isPasswordVisible"
          :class="`${carbonPrefix}--icon-visibility-off`"
        />
        <View16 v-else :class="`${carbonPrefix}--icon-visibility-on`" />
      </button>
    </div>
    <div v-if="isInvalid" :class="`${carbonPrefix}--form-requirement`">
      <slot name="invalid-message">{{ invalidMessage }}</slot>
    </div>
    <div v-if="isWarn" :class="`${carbonPrefix}--form__requirement`">
      <slot name="warn-text">{{ warnText }}</slot>
    </div>
    <div
      v-if="isHelper"
      :class="[
        `${carbonPrefix}--form__helper-text`,
        { [`${carbonPrefix}--form__helper-text--disabled`]: $attrs.disabled },
      ]"
    >
      <slot name="helper-text">{{ helperText }}</slot>
    </div>
  </div>
</template>

<script setup>
import {
  onBeforeMount,
  onBeforeUpdate,
  ref,
  useSlots,
  computed,
  watch,
  nextTick,
} from 'vue';
import {
  WarningFilled16,
  WarningAltFilled16,
  ViewOff16,
  View16,
} from '@carbon/icons-vue';
import { carbonPrefix } from '../../global/settings';
import { useCvId, props as propsCvId } from '../../use/cvId';
import { useIsLight, props as propsTheme } from '../../use/cvTheme';
import { inputTypes } from './const';

const props = defineProps({
  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText: { type: String, default: undefined },
  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel: { type: Boolean, default: false },
  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidMessage: { type: String, default: undefined },
  /**
   * Input's label
   */
  label: { type: String, default: undefined },
  /**
   * Input's value, modelValue is the vue3 default 'prop' for two-way data binding with v-model
   */
  modelValue: { type: String, default: undefined },
  /**
   * Hide password" tooltip text on password visibility toggle
   */
  passwordHideLabel: { type: String, default: 'Hide password' },
  /**
   * Show password tooltip text on password visibility toggle
   */
  passwordShowLabel: { type: String, default: 'Show password' },
  /**
   * Toggle password visibility
   */
  passwordVisible: { type: Boolean, default: undefined },
  /**
   * Input type, only `text` and `password` are available
   */
  type: {
    type: String,
    default: 'text',
    validator: value => inputTypes.has(value),
  },
  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: { type: String, default: undefined },
  ...propsCvId,
  ...propsTheme,
});
defineEmits(['update:modelValue']);
const cvId = useCvId(props);

// DOM Elements
const input = ref();
const slots = useSlots();

// Data
const isInvalid = ref(false);
const isWarn = ref(false);
const isHelper = ref(false);
const isLight = useIsLight(props);
const dataType = ref(props.type);
const dataPasswordVisible = ref(false);

// Computed Values
const isPassword = computed(() => props.type === 'password');
const isPasswordVisible = computed(
  () => isPassword.value && dataPasswordVisible.value
);
const passwordHideShowLabel = computed(() =>
  isPasswordVisible.value ? props.passwordHideLabel : props.passwordShowLabel
);

// Watchers
watch(
  () => props.passwordVisible,
  newValue => {
    if (newValue !== dataPasswordVisible.value) {
      togglePasswordVisibility();
    }
  }
);
watch(
  () => props.type,
  newValue => {
    dataType.value = newValue;
  }
);

// Methods
function togglePasswordVisibility() {
  const currentValue = input.value.value;
  dataPasswordVisible.value = !dataPasswordVisible.value;
  dataType.value = dataPasswordVisible.value ? 'text' : 'password';
  nextTick(() => {
    input.value.value = currentValue;
  });
}

function checkSlots() {
  // NOTE: slots is not reactive so needs to be managed on updated
  isInvalid.value = !!(
    props.invalidMessage?.length || slots['invalid-message']
  );
  isWarn.value =
    !isInvalid.value && !!(props.warnText?.length || slots['warn-text']);
  isHelper.value =
    !isInvalid.value &&
    !isWarn.value &&
    !!(props.helperText?.length || slots['helper-text']);
}

// Lifecycle Hooks
onBeforeMount(() => {
  checkSlots();
  // update initial state for dataPasswordVisible & dataType
  if (isPassword.value && props.passwordVisible) {
    dataPasswordVisible.value = true;
    dataType.value = 'text';
  }
});
onBeforeUpdate(checkSlots);
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>
