<template>
  <div :class="wrapperClasses">
    <label :class="labelClasses">{{ label }}</label>
    <div :class="`${carbonPrefix}--text-input__field-wrapper`" :data-invalid="isInvalid">
      <WarningFilled16 v-if="isInvalid" :class="`${carbonPrefix}--text-input__invalid-icon`" />
      <input
        :type="inputType"
        :data-toggle-password-visibility="isPassword"
        :class="inputClasses"
        :disabled="disabled"
      />
      <button
        type="button"
        v-if="isPassword"
        :class="[
          `${carbonPrefix}--btn`,
          `${carbonPrefix}--text-input--password__visibility__toggle`,
          `${carbonPrefix}--tooltip__trigger`,
          `${carbonPrefix}--tooltip--a11y`,
          `${carbonPrefix}--tooltip--bottom`,
          `${carbonPrefix}--tooltip--align-center`,
        ]"
        @click="togglePassword"
      >
        <span :class="[`${carbonPrefix}--assistive-text`]">{{ togglePasswordLabel }}</span>
        <ViewOff16 v-if="dataPasswordVisible" :class="`${carbonPrefix}--icon-visibility-off`"></ViewOff16>
        <View16 v-else :class="`${carbonPrefix}--icon-visibility-off`"></View16>
      </button>
    </div>
    <div v-if="isInvalid" :class="`${carbonPrefix}--form-requirement`">{{ invalidMessage }}</div>
    <div v-else :class="helperTextClasses">{{ helperText }}</div>
  </div>
</template>

<script setup>
import { computed, defineProps, ref } from 'vue';
import { carbonPrefix } from '../../global/settings';
import { WarningFilled16, View16, ViewOff16 } from '@carbon/icons-vue';

const props = defineProps({
  label: {
    type: String,
  },
  helperText: {
    type: String,
  },
  invalidMessage: {
    type: String,
  },
  disabled: {
    type: Boolean,
  },
  type: {
    type: String,
    validator: function (value) {
      return ['text', 'password'].includes(value);
    }
  }
})

let isInvalid = computed(() => {
  return !!props.invalidMessage;
});

const inputType = computed(() => {
  if (props.type === 'password' && dataPasswordVisible.value === true) {
    /* Special case: if type is password, but user has enabled visible password toggle */
    return 'text';
  } else {
    return props.type;
  }
});

const wrapperClasses = computed(() => {
  const classes = [
    `cv-text-input`,
    `${carbonPrefix}--form-item`,
    `${carbonPrefix}--text-input-wrapper`,
  ];
  if (isPassword.value) {
    classes.push(`${carbonPrefix}--password-input-wrapper`);
  }
  return classes;
});

const labelClasses = computed(() => {
  const classes = [`${carbonPrefix}--label`];
  if (props.disabled) {
    classes.push(`${carbonPrefix}--label--disabled`);
  }
  if (isPassword.value) {
    classes.push(`${carbonPrefix}--password-input`);
  }
  return classes;
});

const helperTextClasses = computed(() => {
  const classes = [`${carbonPrefix}--form__helper-text`];
  if (props.disabled) {
    classes.push(`${carbonPrefix}--form__helper-text--disabled`);
  }
  return classes;
});

const inputClasses = computed(() => {
  const classes = [`${carbonPrefix}--text-input`];
  if (isInvalid.value) {
    classes.push(`${carbonPrefix}--text-input--invalid`);
  }
  if (isPassword.value) {
    classes.push(`${carbonPrefix}--password-input`);
  }
  return classes;
});


function usePasswordFeature() {
  let dataPasswordVisible = ref(false);

  let isPassword = computed(() => {
    return props.type === 'password';
  });

  let togglePasswordLabel = computed(() => {
    if (dataPasswordVisible.value) {
      return "Hide password";
    } else {
      return "Show password"
    }
  });

  let togglePassword = () => {
    dataPasswordVisible.value = !dataPasswordVisible.value;
  };
  return { dataPasswordVisible, isPassword, togglePasswordLabel, togglePassword };
}
const { dataPasswordVisible, isPassword, togglePasswordLabel, togglePassword } = usePasswordFeature();
</script>
