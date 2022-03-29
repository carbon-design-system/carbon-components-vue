<template>
  <div
    :class="
      `cv-text-input ${carbonPrefix}--form-item ${carbonPrefix}--text-input-wrapper`
    "
  >
    <label :class="labelClasses">{{ label }}</label>
    <div
      :class="`${carbonPrefix}--text-input__field-wrapper`"
      :data-invalid="isInvalid"
    >
      <WarningFilled16
        v-if="isInvalid"
        :class="`${carbonPrefix}--text-input__invalid-icon`"
      />
      <input type="text" :class="inputClasses" :disabled="disabled" />
    </div>
    <div v-if="isInvalid" :class="`${carbonPrefix}--form-requirement`">
      {{ invalidMessage }}
    </div>
    <div v-else :class="helperTextClasses">
      {{ helperText }}
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { carbonPrefix } from '../../global/settings';
import { WarningFilled16 } from '@carbon/icons-vue';
export default {
  name: 'CvTextInput',
  components: { WarningFilled16 },
  props: {
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
  },
  setup(props) {
    let isInvalid = computed(() => {
      return !!props.invalidMessage;
    });

    const labelClasses = computed(() => {
      const classes = [`${carbonPrefix}--label`];
      if (props.disabled) {
        classes.push(`${carbonPrefix}--label--disabled`);
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
      return classes;
    });
    return {
      carbonPrefix,
      isInvalid,
      labelClasses,
      helperTextClasses,
      inputClasses,
    };
  },
};
</script>
