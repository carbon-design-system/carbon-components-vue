<template>
  <div class="cv-checkbox" :class="formItemClasses">
    <label
      :class="labelClasses"
      :data-contained-checkbox-state="isChecked"
      :data-contained-checkbox-disabled="$attrs.disabled"
    >
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
      />
      {{ label }}
    </label>
  </div>
</template>

<script>
import checkMixin from '../../mixins/check-mixin';
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';

export default {
  name: 'CvCheckbox',
  mixins: [checkMixin, carbonPrefixMixin],
  inheritAttrs: false,
  props: {
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
      const classes = ['bx--checkbox-label'];
      if (this.$attrs.disabled !== undefined && this.$attrs.disabled) {
        classes.push(`${this.carbonPrefix}--label--disabled`);
      }
      if (this.hasFocus) {
        classes.push(`${this.carbonPrefix}--checkbox-label__focus`);
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
