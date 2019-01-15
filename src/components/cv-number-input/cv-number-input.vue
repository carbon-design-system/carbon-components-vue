<template>
  <div class="cv-number-input bx--form-item">
    <div
      data-numberinput
      class="bx--number"
      :class="{
        'bx--number--light': theme === 'light',
        'bx--number--helpertext': $slots['helper-text'],
      }"
      :data-invalid="invalid"
    >
      <div class="bx--number__controls">
        <button class="bx--number__control-btn up-icon" @click="doUp">
          <svg width="10" height="5" viewBox="0 0 10 5">
            <path d="M0 5L5 .002 10 5z" fill-rule="evenodd"></path>
          </svg>
        </button>
        <button class="bx--number__control-btn down-icon" @click="doDown">
          <svg width="10" height="5" viewBox="0 0 10 5">
            <path d="M0 0l5 4.998L10 0z" fill-rule="evenodd"></path>
          </svg>
        </button>
      </div>
      <input
        :id="uid"
        type="number"
        v-model="internalValue"
        @keypress.down.prevent="doDown"
        @keypress.up.prevent="doUp"
        v-bind="$attrs"
        v-on="inputListeners"
      />
      <label :for="uid" class="bx--label">{{ label }}</label>
      <div class="bx--form-requirement" v-if="$slots['invalid-message']">
        <slot name="invalid-message">Invalid number</slot>
      </div>
      <div class="bx--form__helper-text" v-if="$slots['helper-text']">
        <slot name="helper-text"></slot>
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
    label: String,
    value: Number,
    invalid: Boolean,
  },
  data() {
    return {
      internalValue: this.value ? parseInt(this.value, 10) : 0,
    };
  },
  watch: {
    value() {
      this.internalValue = this.value ? parseInt(this.value, 10) : 0;
    },
  },
  computed: {
    // Bind listeners at the component level to the embedded input element and
    // add our own input listener to service the v-model. See:
    // https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model
    inputListeners() {
      return Object.assign({}, this.$listeners, {
        input: event => this.$emit('input', this.internalIntValue),
        change: event => this.$emit('change', this.internalIntValue),
      });
    },
    internalIntValue() {
      return typeof this.internalValue === 'number'
        ? this.internalValue
        : parseInt(this.internalValue, 10);
    },
  },
  methods: {
    doUp() {
      this.internalValue = this.internalIntValue + 1;
    },
    doDown() {
      this.internalValue = this.internalIntValue - 1;
    },
  },
  model: {
    prop: 'value',
    event: 'input',
  },
};
</script>

<style lang="scss"></style>
