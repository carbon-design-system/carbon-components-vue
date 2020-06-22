<template>
  <div class="cv-checkbox" :class="formItemClasses">
    <input
      ref="input"
      v-bind="$attrs"
      v-on="inputListeners"
      :class="`${carbonPrefix}--checkbox`"
      type="checkbox"
      :checked="isChecked === true"
      :aria-checked="`${isChecked}`"
      @focus="onFocus"
      @blur="onBlur"
      :value="value"
      :id="uid"
    />
    <label
      :class="labelClasses"
      :data-contained-checkbox-state="isChecked"
      :data-contained-checkbox-disabled="$attrs.disabled"
      :for="uid"
    >
      <span :class="labelContentClasses">
        {{ label }}
      </span>
    </label>
  </div>
</template>

<script>
import checkMixin from '../../mixins/check-mixin';
import uidMixin from '../../mixins/uid-mixin';
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';

export default {
  name: 'CvCheckbox',
  mixins: [checkMixin, uidMixin, carbonPrefixMixin],
  inheritAttrs: false,
  props: {
    hideLabel: Boolean,
    label: String,
    mixed: Boolean,
    formItem: { type: Boolean, default: true },
  },
  watch: {
    mixed() {
      this.dataMixed = this.mixed;
      if (this.dataMixed && this.checked !== true) {
        this.isChecked = false; // reset check state so mixed takes
      }
    },
  },
  data() {
    return {
      hasFocus: false,
      dataMixed: this.mixed,
    };
  },
  computed: {
    formItemClasses() {
      const classes = [`${this.carbonPrefix}--checkbox-wrapper`];
      if (this.formItem) {
        classes.push(`${this.carbonPrefix}--form-item`);
      }
      return classes;
    },
    labelClasses() {
      const classes = [`${this.carbonPrefix}--checkbox-label`];
      if (this.$attrs.disabled !== undefined && this.$attrs.disabled) {
        classes.push(`${this.carbonPrefix}--label--disabled`);
      }
      if (this.hasFocus) {
        classes.push(`${this.carbonPrefix}--checkbox-label__focus`);
      }
      return classes;
    },
    labelContentClasses() {
      const classes = [`${this.carbonPrefix}--checkbox-label-text`];
      if (this.hideLabel) {
        classes.push(`${this.carbonPrefix}--visually-hidden`);
      }
      return classes;
    },
  },
  methods: {
    onFocus() {
      this.hasFocus = true;
    },
    onBlur() {
      this.hasFocus = false;
    },
  },
};
</script>
