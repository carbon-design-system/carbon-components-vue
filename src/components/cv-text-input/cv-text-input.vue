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
    />
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
    theme: String,
    value: String,
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
  },
};
</script>

<style lang="scss"></style>
