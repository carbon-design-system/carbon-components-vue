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
        @change="onAmpmChange"
        :disabled="disabled"
      >
        <cv-select-option
          class="bx--select-option"
          internalValue="AM"
          :selected="internalValue.ampm === 'AM'"
        >AM</cv-select-option>
        <cv-select-option
          class="bx--select-option"
          internalValue="PM"
          :selected="internalValue.ampm === 'PM'"
        >PM</cv-select-option>
      </cv-select>

      <cv-select
        class="bx--time-picker__select"
        inline
        hide-label
        :label="timezonesSelectLabel"
        v-if="timezones.length > 0"
        @change="onTimezoneChange"
        :disabled="disabled"
      >
        <cv-select-option
          class="bx--select-option"
          v-for="timezone in timezones"
          :key="timezone.internalValue"
          :data-test="internalValue.timezone"
          :selected="internalValue.timezone === timezone.internalValue"
          :internalValue="timezone.internalValue"
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
      result.time = ev.target.internalValue;
      this.$emit('change', result);
    },
    onAmpmChange(ev) {
      const result = { ...this.internalValue };
      result.ampm = ev.target.internalValue;
      this.$emit('change', result);
    },
    onTimezoneChange(ev) {
      const result = { ...this.internalValue };
      result.timezone = ev.target.internalValue;
      this.$emit('change', result);
    },
  },
};
</script>

<style lang="scss">
</style>
