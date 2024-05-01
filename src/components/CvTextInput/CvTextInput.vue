<template>
  <cds-text-input
    v-bind="wcProps()"
    :warn="isWarn || null"
    :invalid="isInvalid || null"
    :show-password-visibility-toggle="compatPasswordToggle"
    :show-password-label="compatShowPasswordLabel"
    :hide-password-label="compatHidePasswordLabel"
    :value="modelValue"
    @input="$event => $emit('update:modelValue', $event.target.value)"
    class="cv-text-input"
  >
    <div v-if="$slots['label-text']" slot="label-text">
      <slot name="label-text" />
    </div>
    <div v-if="$slots['helper-text']" slot="helper-text">
      <slot name="helper-text" />
    </div>
    <slot></slot>
  </cds-text-input>
</template>

<script setup>
import '@carbon/web-components/es/components/text-input/index.js';
import {
  INPUT_SIZE,
  INPUT_TOOLTIP_ALIGNMENT,
  INPUT_TOOLTIP_DIRECTION,
  INPUT_TYPE,
} from '@carbon/web-components/es/components/text-input/text-input';
import { computed, onBeforeMount, onBeforeUpdate, ref, useSlots } from 'vue';

const props = defineProps({
  /**
   * May be any of the standard HTML autocomplete options
   */
  autocomplete: { type: String, default: undefined },
  /**
   * Sets the input to be focussed automatically on page load. Defaults to false
   */
  autofocus: { type: Boolean, default: false },
  /**
   * Controls the disabled state of the input
   */
  disabled: { type: Boolean, default: false },
  /**
   * Specify whether to display the character counter
   */
  enableCounter: { type: Boolean, default: false },
  /**
   * The helper text.
   */
  helperText: { type: String, default: undefined },
  /**
   * Specify if the current value is invalid.
   */
  invalid: { type: Boolean, default: false },
  /**
   * Message which is displayed if the value is invalid.
   */
  invalidText: { type: String, default: undefined },
  /**
   * Max character count allowed for input. This is needed in order for enableCounter to display
   */
  maxCount: { type: Number, default: undefined },
  /**
   * Specify whether the control is currently in warning state
   */
  warn: { type: Boolean, default: false },
  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: { type: String, default: undefined },
  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel: { type: Boolean, default: false },
  /**
   * Generic label that will be used as the textual representation of what this field is for
   */
  label: { type: String, default: undefined },
  /**
   * Name for the input in the `FormData`
   */
  name: { type: String, default: undefined },
  /**
   * Pattern to validate the input against for HTML validity checking
   */
  pattern: { type: String, default: undefined },
  /**
   * Value to display when the input has an empty `value`
   */
  placeholder: { type: String, default: undefined },
  /**
   * Specify if the component should be read-only
   */
  readonly: { type: Boolean, default: false },
  /**
   * Boolean property to set the required status
   */
  required: { type: Boolean, default: false },
  /**
   * The special validity message for `required`.
   */
  requiredValidityMessage: { type: String, default: undefined },
  /**
   * "Hide password" tooltip text on password visibility toggle
   */
  hidePasswordLabel: { type: String, default: undefined },
  /**
   * "Show password" tooltip text on password visibility toggle
   */
  showPasswordLabel: { type: String, default: undefined },
  /**
   * Boolean property to render password visibility toggle
   */
  showPasswordVisibilityToggle: { type: Boolean, default: undefined },
  /**
   * The input box size.
   */
  size: {
    type: String,
    default: INPUT_SIZE.MEDIUM,
    /** @param {string} value */
    validator(value) {
      return Object.values(INPUT_SIZE).includes(value);
    },
  },
  /**
   * true to use the inline version.
   */
  inline: { type: Boolean, default: false },
  /**
   * Specify the alignment of the tooltip to the icon-only button.
   * Can be one of: start, center, or end.
   */
  tooltipAlignment: {
    type: String,
    default: undefined,
    /** @param {string} value */
    validator(value) {
      return Object.values(INPUT_TOOLTIP_ALIGNMENT).includes(value);
    },
  },
  /**
   * Specify the direction of the tooltip for icon-only buttons.
   * Can be either top, right, bottom, or left.
   */
  tooltipDirection: {
    type: String,
    default: undefined,
    /** @param {string} value */
    validator(value) {
      return Object.values(INPUT_TOOLTIP_DIRECTION).includes(value);
    },
  },
  /**
   * The type of the input. Can be one of the types listed in the INPUT_TYPE enum
   */
  type: {
    type: String,
    default: INPUT_TYPE.TEXT,
    /** @param {string} value */
    validator(value) {
      return Object.values(INPUT_TYPE).includes(value);
    },
  },
  /**
   * The validity message. If present and non-empty, this input shows the UI of its invalid state.
   */
  validityMessage: { type: String, default: undefined },

  // ---- current vue 3 -------
  /**
   * @deprecated use invalidText
   */
  invalidMessage: { type: String, default: undefined },
  /**
   * Input's value, modelValue is the vue3 default 'prop' for two-way data binding with v-model
   */
  modelValue: { type: String, default: undefined },
  /**
   * @deprecated use hidePasswordLabel
   */
  passwordHideLabel: { type: String, default: 'Hide password' },
  /**
   * @deprecated use showPasswordLabel
   */
  passwordShowLabel: { type: String, default: 'Show password' },
  /**
   * @deprecated does not work in Carbon 11
   */
  passwordVisible: { type: Boolean, default: undefined },
});
defineEmits(['update:modelValue']);
const wcProps = () => {
  return {
    ...props,
    passwordVisible: undefined,
    passwordShowLabel: undefined,
    passwordHideLabel: undefined,
    modelValue: undefined,
    invalidMessage: undefined,
    hidePasswordLabel: undefined, // compatHidePasswordLabel
    showPasswordVisibilityToggle: undefined, //compatPasswordToggle
    invalid: undefined, // isInvalid
    warn: undefined, // isWarn
    helperText: props.helperText || null,
  };
};
// Data
const isInvalid = ref(false);
const isWarn = ref(false);

const compatInvalid = computed(() => props.invalidText || props.invalidMessage);
const compatHidePasswordLabel = computed(() => {
  if (props.type === INPUT_TYPE.PASSWORD)
    return props.hidePasswordLabel || props.passwordHideLabel || null;
});
const compatShowPasswordLabel = computed(() => {
  if (props.type === INPUT_TYPE.PASSWORD)
    return props.showPasswordLabel || props.passwordShowLabel || null;
});
const compatPasswordToggle = computed(() => {
  if (props.showPasswordVisibilityToggle !== undefined)
    return props.showPasswordVisibilityToggle || null;
  else return props.type === INPUT_TYPE.PASSWORD || null;
});

const slots = useSlots();
const useInvalidSlot = ref(false);
const useWarningSlot = ref(false);
const hasHelperSlot = ref(false);
function checkSlots() {
  // NOTE: slots is not reactive so needs to be managed on updated
  isInvalid.value = !!(
    props.invalid ||
    compatInvalid.value?.length ||
    slots['invalid-message']
  );
  isWarn.value =
    !isInvalid.value &&
    !!(props.warn || props.warnText?.length || slots['warn-text']);

  hasHelperSlot.value = !!slots['helper-text'];
}

// Lifecycle Hooks
onBeforeMount(() => checkSlots());
onBeforeUpdate(() => checkSlots());
</script>
<style>
/*Work around for web component bugs*/
.cv-text-input {
  --cds-field: var(--cds-field-01);
  --cds-border-strong: var(--cds-border-strong-01);
}
</style>
