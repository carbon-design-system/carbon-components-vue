<template>
  <div class="cv-checkbox" :class="[`${carbonPrefix}--checkbox-wrapper`, { [`${carbonPrefix}--form-item`]: formItem }]">
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
      :class="[
        `${carbonPrefix}--checkbox-label`,
        {
          [`${carbonPrefix}--label--disabled`]: $attrs.disabled !== undefined && this.$attrs.disabled,
          [`${carbonPrefix}--checkbox-label__focus`]: hasFocus,
        },
      ]"
      :data-contained-checkbox-state="isChecked"
      :data-contained-checkbox-disabled="$attrs.disabled"
      :for="uid"
    >
      <span :class="[`${carbonPrefix}--checkbox-label-text`, { [`${carbonPrefix}--visually-hidden`]: hideLabel }]">
        {{ label }}
      </span>
    </label>
  </div>
</template>

<script>
import { checkMixin, uidMixin, carbonPrefixMixin, methodsMixin } from '../../mixins';

export default {
  name: 'CvCheckbox',
  mixins: [checkMixin, uidMixin, carbonPrefixMixin, methodsMixin({ input: ['blur', 'focus'] })],
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
