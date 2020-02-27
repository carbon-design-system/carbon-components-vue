<template>
  <div class="cv-checkbox bx--checkbox-wrapper" :class="{ 'bx--form-item': formItem }">
    <input
      ref="input"
      v-bind="$attrs"
      v-on="inputListeners"
      class="bx--checkbox"
      type="checkbox"
      :checked="isChecked === true"
      :aria-checked="`${isChecked}`"
      @focus="onFocus"
      @blur="onBlur"
      :value="value"
      :id="uid"
    />
    <label
      :class="[
        'bx--checkbox-label',
        {
          'bx--label--disabled': $attrs.disabled !== undefined && $attrs.disabled,
          'bx--checkbox-label__focus': hasFocus,
        },
      ]"
      :data-contained-checkbox-state="isChecked"
      :data-contained-checkbox-disabled="$attrs.disabled"
      :for="uid"
    >
      <span class="bx--checkbox-label-text" :class="{ 'bx--visually-hidden': hideLabel }">
        {{ label }}
      </span>
    </label>
  </div>
</template>

<script>
import checkMixin from '../../mixins/check-mixin';
import uidMixin from '../../mixins/uid-mixin';

export default {
  name: 'CvCheckbox',
  mixins: [checkMixin, uidMixin],
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
