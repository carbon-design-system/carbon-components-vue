<template>
  <div :class="outerWrapperClasses">
    <label :class="labelClasses">{{ label }}</label>
    <div :class="innerWrapperClasses" :data-invalid="isInvalid">
      <WarningFilled16
        v-if="isInvalid"
        :class="`${carbonPrefix}--text-input__invalid-icon`"
      />
      <input
        :type="inputType"
        :data-toggle-password-visibility="isPassword"
        :class="inputClasses"
        :disabled="disabled"
      />
      <button
        type="button"
        v-if="isPassword"
        :class="togglePasswordButtonClasses"
        @click="togglePassword"
      >
        <span :class="`${carbonPrefix}--assistive-text`">{{
          togglePasswordLabel
        }}</span>
        <ViewOff16
          v-if="dataPasswordVisible"
          :class="`${carbonPrefix}--icon-visibility-off`"
        ></ViewOff16>
        <View16 v-else :class="`${carbonPrefix}--icon-visibility-on`"></View16>
      </button>
    </div>
    <div v-if="isInvalid" :class="`${carbonPrefix}--form-requirement`">
      {{ invalidMessage }}
    </div>
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
    validator: function(value) {
      return ['text', 'password'].includes(value);
    },
  },
  light: {
    type: Boolean,
  },
});

const inputType = computed(() => {
  if (props.type === 'password' && dataPasswordVisible.value === true) {
    /* Special case: if type is password, but user has enabled visible password toggle */
    return 'text';
  } else {
    return props.type;
  }
});

function useValidation() {
  let isInvalid = computed(() => {
    return !!props.invalidMessage;
  });

  return { isInvalid };
}

const { isInvalid } = useValidation();

function useClasses() {
  const outerWrapperClasses = computed(() => {
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

  const innerWrapperClasses = computed(() => {
    const classes = [`${carbonPrefix}--text-input__field-wrapper`];
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
    if (props.light) {
      classes.push(`${carbonPrefix}--text-input--light`);
    }
    return classes;
  });

  return {
    outerWrapperClasses,
    labelClasses,
    innerWrapperClasses,
    helperTextClasses,
    inputClasses,
  };
}

const {
  outerWrapperClasses,
  labelClasses,
  innerWrapperClasses,
  helperTextClasses,
  inputClasses,
} = useClasses();

function usePasswordFeature() {
  let dataPasswordVisible = ref(false);

  let isPassword = computed(() => {
    return props.type === 'password';
  });

  let togglePasswordLabel = computed(() => {
    if (dataPasswordVisible.value) {
      return 'Hide password';
    } else {
      return 'Show password';
    }
  });

  let togglePassword = () => {
    dataPasswordVisible.value = !dataPasswordVisible.value;
  };

  const togglePasswordButtonClasses = computed(() => {
    const classes = [
      `${carbonPrefix}--btn`,
      `${carbonPrefix}--text-input--password__visibility__toggle`,
      `${carbonPrefix}--tooltip__trigger`,
      `${carbonPrefix}--tooltip--a11y`,
      `${carbonPrefix}--tooltip--bottom`,
      `${carbonPrefix}--tooltip--align-center`,
    ];
    return classes;
  });
  return {
    dataPasswordVisible,
    isPassword,
    togglePasswordLabel,
    togglePassword,
    togglePasswordButtonClasses,
  };
}
const {
  dataPasswordVisible,
  isPassword,
  togglePasswordLabel,
  togglePassword,
  togglePasswordButtonClasses,
} = usePasswordFeature();
</script>
