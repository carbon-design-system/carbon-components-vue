<template>
  <div class="cv-number-input bx--form-item">
    <div
      data-numberinput
      class="bx--number"
      :class="{
        'bx--number--light': theme === 'light',
        'bx--number--helpertext': isHelper,
      }"
      :data-invalid="isInvalid"
    >
      <div class="bx--number__controls">
        <button
          class="bx--number__control-btn up-icon"
          @click="doUp"
          type="button"
        >
          <svg width="10" height="5" viewBox="0 0 10 5">
            <path d="M0 5L5 .002 10 5z" fill-rule="evenodd"></path>
          </svg>
        </button>
        <button
          class="bx--number__control-btn down-icon"
          @click="doDown"
          type="button"
        >
          <svg width="10" height="5" viewBox="0 0 10 5">
            <path d="M0 0l5 4.998L10 0z" fill-rule="evenodd"></path>
          </svg>
        </button>
      </div>
      <input
        :id="uid"
        type="number"
        v-model="internalValue"
        v-bind="$attrs"
        v-on="inputListeners"
      />
      <label :for="uid" class="bx--label">{{ label }}</label>
      <div class="bx--form-requirement" v-if="isInvalid">
        <slot name="invalid-message">{{ invalidMessage }}</slot>
      </div>
      <div class="bx--form__helper-text" v-if="isHelper">
        <slot name="helper-text">{{ helperText }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import themeMixin from '../../mixins/theme-mixin';

export default {
  name: 'CvNumberInput',
  mixins: [uidMixin, themeMixin],
  inheritAttrs: false,
  props: {
    helperText: { type: String, default: null },
    invalidMessage: { type: String, default: null },
    label: String,
    value: String,
    invalid: /* deprecate */ {
      type: Boolean,
      default: undefined,
      validator(val) {
        if (val !== undefined) {
          console.warn(
            'CvNumberInput: invalid prop deprecated in favour of invalidMessage'
          );
        }
        return true;
      },
    },
  },
  data() {
    return {
      internalValue: this.value,
    };
  },
  watch: {
    value() {
      this.internalValue = this.value;
    },
  },
  computed: {
    // Bind listeners at the component level to the embedded input element and
    // add our own input listener to service the v-model. See:
    // https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model
    inputListeners() {
      return Object.assign({}, this.$listeners, {
        input: () => this.$emit('input', this.internalValue),
      });
    },
    internalIntValue() {
      let intVal = parseInt(this.internalValue, 10);

      if (isNaN(intVal)) {
        intVal = 0;
      }
      return intVal;
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
  methods: {
    doUp() {
      this.internalValue = `${this.internalIntValue + 1}`;
      this.$emit('input', this.internalValue);
    },
    doDown() {
      this.internalValue = `${this.internalIntValue - 1}`;
      this.$emit('input', this.internalValue);
    },
  },
};
</script>

<style lang="scss"></style>
