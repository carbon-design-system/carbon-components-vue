<template>
  <div class="cv-text-input bx--form-item">
    <label
      :for="uid"
      :class="[
        'bx--label',
        {
          'bx--label--disabled':
            $attrs.disabled !== undefined && $attrs.disabled,
        },
      ]"
      >{{ label }}</label
    >
    <div class="bx--form__helper-text" v-if="isHelper">
      <slot name="helper-text">{{ helperText }}</slot>
    </div>
    <input
      :id="uid"
      class="bx--text-input"
      :class="{ 'bx--text-input--light': theme === 'light' }"
      v-bind="$attrs"
      :value="value"
      v-on="inputListeners"
      :data-invalid="isInvalid"
      :data-toggle-password-visibility="isPassword"
      :type="dataType"
      ref="input"
    />
    <button
      v-if="isPassword"
      class="bx--text-input--password__visibility bx--tooltip__trigger bx--tooltip--icon__bottom"
      :aria-label="isPasswordVisible ? 'Hide password' : 'Show password'"
      @click="togglePasswordVisibility"
    >
      <svg
        v-if="isPasswordVisible"
        class="icon--visibility-off"
        width="16"
        height="16"
        viewBox="0 0 16 16"
      >
        <path
          d="M11.846 3.45L15.293.007 16 .714l-3.284 3.281c1.261.902 2.377 2.212 3.347 3.93C14.02 11.642 11.333 13.5 8 13.5c-1.392 0-2.667-.324-3.822-.973L.703 16l-.706-.708 3.323-3.32C2.071 11.042.976 9.694.035 7.924 2.012 4.308 4.667 2.5 8 2.5c1.395 0 2.677.317 3.846.95zm-6.928 8.338c.944.477 1.97.712 3.082.712 2.795 0 5.076-1.483 6.907-4.568-.866-1.417-1.833-2.486-2.91-3.219l-1.55 1.55a3 3 0 0 1-4.185 4.182l-1.344 1.343zm-.882-.533l1.518-1.517A3 3 0 0 1 9.74 5.556l1.364-1.363A7.02 7.02 0 0 0 8 3.5c-2.798 0-5.047 1.439-6.819 4.432.842 1.465 1.792 2.568 2.855 3.323zm2.948-1.532a2 2 0 0 0 2.74-2.738l-2.74 2.738zm-.707-.707l2.74-2.738a2 2 0 0 0-2.74 2.738z"
        ></path>
      </svg>
      <svg
        v-else
        class="icon--visibility-on"
        width="16"
        height="16"
        viewBox="0 0 16 11"
      >
        <path
          d="M8 7.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 1c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"
        ></path>
        <path
          d="M8 10c2.8 0 5.1-1.5 6.9-4.6C13.1 2.5 10.8 1 8 1 5.2 1 3 2.4 1.2 5.4 2.9 8.6 5.2 10 8 10zM8 0c3.3 0 6 1.8 8.1 5.4C14 9.2 11.3 11 8 11S2 9.2 0 5.5C2 1.9 4.6 0 8 0z"
        ></path>
      </svg>
    </button>
    <div class="bx--form-requirement" v-if="isInvalid">
      <slot name="invalid-message">{{ invalidMessage }}</slot>
    </div>
  </div>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import themeMixin from '../../mixins/theme-mixin';

export default {
  name: 'CvTextInput',
  mixins: [uidMixin, themeMixin],
  inheritAttrs: false,
  props: {
    helperText: { type: String, default: null },
    invalidMessage: { type: String, default: null },
    label: String,
    passwordVisible: Boolean,
    theme: String,
    type: String,
    value: String,
  },
  data() {
    return {
      dataPasswordVisible: this.isPassword && this.passwordVisible,
      dataType: this.type,
    };
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
    isInvalid() {
      return (
        this.$slots['invalid-message'] ||
        (this.invalidMessage && this.invalidMessage.length)
      );
    },
    isHelper() {
      return (
        this.$slots['helper-text'] ||
        (this.helperText && this.helperText.length)
      );
    },
    isPassword() {
      return this.type === 'password';
    },
    isPasswordVisible() {
      return this.isPassword && this.dataPasswordVisible;
    },
  },
  methods: {
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

<style lang="scss"></style>
