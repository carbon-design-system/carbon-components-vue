<template>
  <div data-numberinput class="cv-number-input bx--number" :class="{'bx--number--light': theme === 'light'}" :data-invalid="invalid">
    <div class="bx--number__controls">
      <button class="bx--number__control-btn up-icon">
        <svg width="10" height="5" viewBox="0 0 10 5">
          <path d="M0 5L5 .002 10 5z" fill-rule="evenodd" />
        </svg>
      </button>
      <button class="bx--number__control-btn down-icon">
        <svg width="10" height="5" viewBox="0 0 10 5">
          <path d="M0 0l5 4.998L10 0z" fill-rule="evenodd" />
        </svg>
      </button>
    </div>
    <input
      :id="uid"
      type="number"
      :value="value"
      v-bind="$attrs"
      v-on="inputListeners">
    <label :for="uid" class="bx--label">{{label}}</label>
    <div class="bx--form-requirement" v-if="$slots['invalid-message']">
      <slot name="invalid-message">Invalid number</slot>
    </div>
    <div class="bx--form__helper-text" v-if="$slots['helper-text']">
      <slot name="helper-text"></slot>
    </div>
  </div>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import themeMixin from '../../mixins/theme-mixin';
import { NumberInput } from 'carbon-components';

export default {
  name: 'CvNumberInput',
  mixins: [uidMixin, themeMixin],
  inheritAttrs: false,
  data() {
    return {
      carbonComponent: null,
    };
  },
  props: {
    label: String,
    value: String,
    invalid: Boolean,
  },
  computed: {
    // Bind listeners at the component level to the embedded input element and
    // add our own input listener to service the v-model. See:
    // https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model
    inputListeners() {
      return Object.assign({}, this.$listeners, {
        change: event => this.$emit('change', event.target.value),
      });
    },
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  mounted() {
    this.carbonComponent = NumberInput.create(this.$el);
  },
  beforeDestroy() {
    this.carbonComponent.release();
  },
};
</script>

<style lang="scss">
// Import Style Definitions
@import '~carbon-components/scss/components/number-input/number-input';
</style>
