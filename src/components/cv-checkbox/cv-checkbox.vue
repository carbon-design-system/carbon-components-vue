<template>
  <div class="bx--form-item bx--checkbox-wrapper">
    <label :class="['bx--checkbox-label', {'bx--label--disabled': $attrs.disabled !== undefined}]">
      <input
        ref="input"
        v-bind="$attrs"
        v-on="inputListeners"
        class="bx--checkbox"
        type="checkbox"
        :checked="isChecked"
        :aria-checked="state">
      {{label}}
    </label>
  </div>
</template>

<script>
import { Checkbox } from 'carbon-components';
import checkMixin from '../../mixins/check-mixin';

export default {
  name: 'CvCheckbox',
  mixins: [checkMixin],
  inheritAttrs: false,
  props: {
    label: String,
    mixed: Boolean,
  },
  computed: {
    state() {
      return !this.checked && this.mixed ? 'mixed' : this.checked;
    },
  },
  mounted() {
    // debugger;
    // Checkbox.init(this.$el);
    this.carbonComponent = Checkbox.create(this.$refs.input);
  },
  beforeDestroy() {
    this.carbonComponent.release();
  },
};
</script>

<style lang="scss">
</style>
