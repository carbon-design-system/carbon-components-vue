<template>
  <div class="cv-radio-button">
    <input
      v-bind="$attrs"
      v-on="inputListeners"
      :id="uid"
      :checked="isChecked"
      class="bx--radio-button"
      ref="input"
      type="radio"
      :value="value"
      >
    <label :for="uid" class="bx--radio-button__label">
      <span class="bx--radio-button__appearance"></span>
      {{label}}
    </label>
  </div>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';

const noModelValue = Symbol('radio button - no model value'); // a unique identifier

export default {
  name: 'CvRadioButton',
  mixins: [uidMixin],
  inheritAttrs: false,
  props: {
    _modelValue: { type: [String, Symbol], default: noModelValue },
    checked: Boolean,
    label: String,
    value: { type: String, default: null },
  },
  model: {
    prop: '_modelValue',
    event: '_modelEvent',
  },
  computed: {
    isChecked() {
      if (this._modelValue === noModelValue) {
        return this.checked;
      } else {
        return this._modelValue === this.value;
      }
    },
    // Bind listeners at the component level to the embedded input element and
    // add our own input listener to service the v-model. See:
    // https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model
    inputListeners() {
      return Object.assign({}, this.$listeners, {
        change: event => this.onchange(event),
      });
    },
  },
  methods: {
    onchange(ev) {
      this.$emit('change', ev);
      // console.log(this.value === null);
      this.$emit('_modelEvent', this.value);
    },
  },
};
</script>

<style lang="scss">
// Import Style Definitions
@import '~carbon-components/scss/components/radio-button/radio-button';
</style>
