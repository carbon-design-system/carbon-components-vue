<template>
  <div class="cv-time-picker bx--form-item">
    <div class="bx--time-picker" :class="{'bx--time-picker--light': theme==='light'}">
      <div class="bx--time-picker__input">
        <input
          :id="uid"
          type="text"
          class="bx--time-picker__input-field"
          :pattern="pattern"
          v-bind="$attrs"
          :placeholder="placeholder"
          :maxlength="placeholder.length"
          :data-invalid="invalidMessage.length > 0"
          :internalValue="internalValue.time"
          @input="onInput"
        >
        <div class="bx--form-requirement" v-if="invalidMessage.length > 0">{{invalidMessage}}</div>
        <label :for="uid" class="bx--label">{{label}}</label>
      </div>
      <cv-select
        class="bx--time-picker__select"
        inline
        hide-label
        :label="ampmSelectLabel"
        @input="onAmpmChange"
        :value="internalValue.ampm"
        :disabled="disabled"
      >
        <cv-select-option
          class="bx--select-option"
          value="AM"
          :selected="internalValue.ampm === 'AM'"
        >AM</cv-select-option>
        <cv-select-option class="bx--select-option" value="PM">PM</cv-select-option>
      </cv-select>

      <cv-select
        class="bx--time-picker__select"
        inline
        hide-label
        :label="timezonesSelectLabel"
        v-if="timezones.length > 0"
        @input="onTimezoneChange"
        :value="internalValue.timezone"
        :disabled="disabled"
      >
        <cv-select-option
          class="bx--select-option"
          v-for="timezone in timezones"
          :key="timezone.internalValue"
          :value="timezone.value"
        >{{timezone.label}}</cv-select-option>
      </cv-select>
    </div>
  </div>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import themeMixin from '../../mixins/theme-mixin';

const noModelValue = Symbol('no model internalValue'); // a unique identifier

export default {
  name: 'CvTimePicker',
  mixins: [uidMixin, themeMixin],
  inheritAttrs: false,
  props: {
    modelValue: { type: [Object, Symbol], default: noModelValue },
    ampmSelectLabel: { type: String, default: 'Select AM/PM' },
    disabled: Boolean,
    initialValue: {
      type: Object,
      default: () => ({ time: '', ampm: 'AM', timezone: '' }),
    },
    invalidMessage: { type: String, default: '' },
    label: { type: String, default: 'Select a time' },
    pattern: { type: String, default: '([01][0-9]:[0-6][0-9])' },
    placeholder: { type: String, default: 'hh:mm' },
    timezones: { type: Array, default: () => [] },
    timezonesSelectLabel: { type: String, default: 'Select time zone' },
  },
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  computed: {
    internalValue() {
      let _value;
      if (this.modelValue === noModelValue) {
        _value = { ...this.initialValue };
      } else {
        _value = { ...this.modelValue };
      }
      return _value;
    },
  },
  methods: {
    onInput(ev) {
      const result = { ...this.internalValue };
      result.time = ev.target.value;
      this.$emit('change', result);
    },
    onAmpmChange(newValue) {
      const result = { ...this.internalValue };
      result.ampm = newValue;
      this.$emit('change', result);
    },
    onTimezoneChange(newValue) {
      const result = { ...this.internalValue };
      result.timezone = newValue;
      this.$emit('change', result);
    },
  },
};
</script>

<style lang="scss">
</style>
