<template>
  <div
    :class="[
      `cv-text-input`,
      `${carbonPrefix}--form-item`,
      `${carbonPrefix}--text-input-wrapper`,
      { [`${carbonPrefix}--password-input-wrapper`]: isPassword },
    ]"
  >
    <label
      :for="uid"
      :class="[
        `${carbonPrefix}--label`,
        {
          [`${carbonPrefix}--label--disabled`]: $attrs.disabled !== undefined && $attrs.disabled,
        },
      ]"
      >{{ label }}</label
    >
    <div
      :class="[
        `${carbonPrefix}--text-input__field-wrapper`,
        { [`${carbonPrefix}--text-input__field-wrapper--warning`]: !isInvalid && isWarn },
      ]"
      :data-invalid="isInvalid"
    >
      <WarningFilled16 v-if="isInvalid" :class="`${carbonPrefix}--text-input__invalid-icon`" />
      <WarningAltFilled16
        v-if="isWarn"
        :class="`${carbonPrefix}--text-input__invalid-icon ${carbonPrefix}--text-input__invalid-icon--warning`"
      />

      <input
        :id="uid"
        :class="[
          `${carbonPrefix}--text-input`,
          {
            [`${carbonPrefix}--text-input--light`]: isLight,
            [`${carbonPrefix}--text-input--invalid`]: isInvalid,
            [`${carbonPrefix}--text-input--warning`]: isWarn,
            [`${carbonPrefix}--password-input`]: isPassword,
          },
        ]"
        v-bind="$attrs"
        :value="value"
        v-on="inputListeners"
        :data-toggle-password-visibility="isPassword"
        :type="dataType"
        ref="input"
      />
      <button
        v-if="isPassword"
        :class="[
          `${carbonPrefix}--btn`,
          `${carbonPrefix}--text-input--password__visibility__toggle`,
          `${carbonPrefix}--tooltip__trigger`,
          `${carbonPrefix}--tooltip--a11y`,
          `${carbonPrefix}--tooltip--bottom`,
          `${carbonPrefix}--tooltip--align-center`,
        ]"
        @click="togglePasswordVisibility"
        type="button"
      >
        <span :class="`${carbonPrefix}--assistive-text`">{{ passwordHideShowLabel }}</span>
        <ViewOff16 v-if="isPasswordVisible" :class="`${carbonPrefix}--icon-visibility-off`" />
        <View16 v-else :class="`${carbonPrefix}--icon-visibility-off`" />
      </button>
    </div>
    <div :class="`${carbonPrefix}--form-requirement`" v-if="isInvalid">
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

<script>
import { uidMixin, themeMixin, methodsMixin, carbonPrefixMixin } from '../../mixins';
import { WarningFilled16, WarningAltFilled16, View16, ViewOff16 } from '@carbon/icons-vue';

export default {
  name: 'CvTextInput',
  components: { WarningFilled16, WarningAltFilled16, View16, ViewOff16 },
  mixins: [uidMixin, themeMixin, carbonPrefixMixin, methodsMixin({ input: ['blur', 'focus'] })],
  inheritAttrs: false,
  props: {
    helperText: { type: String, default: undefined },
    invalidMessage: { type: String, default: undefined },
    label: String,
    passwordHideLabel: { type: String, default: 'Hide password' },
    passwordShowLabel: { type: String, default: 'Show password' },
    passwordVisible: Boolean,
    type: String,
    value: String,
    warnText: { type: String, default: undefined },
  },
  data() {
    return {
      dataPasswordVisible: this.isPassword && this.passwordVisible,
      dataType: this.type,
      isHelper: false,
      isInvalid: false,
      isWarn: false,
    };
  },
  mounted() {
    this.checkSlots();
  },
  updated() {
    this.checkSlots();
  },
  watch: {
    passwordVisible() {
      if (this.passwordVisible !== this.dataPasswordVisible) {
        this.togglePasswordVisibility();
      }
    },
    type() {
      this.dataType = this.type;
    },
  },
  computed: {
    // Bind listeners at the component level to the embedded input element and
    // add our own input listener to service the v-model. See:
    // https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model
    inputListeners() {
      return {
        ...this.$listeners,
        input: event => this.$emit('input', event.target.value),
      };
    },
    isPassword() {
      return this.type === 'password';
    },
    isPasswordVisible() {
      return this.isPassword && this.dataPasswordVisible;
    },
    passwordHideShowLabel() {
      return this.isPasswordVisible ? this.passwordHideLabel : this.passwordShowLabel;
    },
  },
  methods: {
    checkSlots() {
      // NOTE: this.$slots is not reactive so needs to be managed on updated
      this.isInvalid = !!(this.$slots['invalid-message'] || (this.invalidMessage && this.invalidMessage.length));
      this.isWarn = !this.isInvalid && !!(this.$slots['warn-text'] || (this.warnText && this.warnText.length));
      this.isHelper =
        !this.isInvalid &&
        !this.isWarn &&
        !!(this.$slots['helper-text'] || (this.helperText && this.helperText.length));
    },
    togglePasswordVisibility() {
      const currentValue = this.$refs.input.value;
      this.dataPasswordVisible = !this.dataPasswordVisible;
      this.dataType = this.dataPasswordVisible ? 'text' : 'password';

      this.$nextTick(() => {
        this.$refs.input.value = currentValue;
      });
    },
  },
};
</script>
