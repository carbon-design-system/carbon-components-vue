<template>
  <div class="bx--form-item">
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
          :value="value.time"
          @input="onInput"/>
        <div class="bx--form-requirement" v-if="invalidMessage.length > 0">
          {{invalidMessage}}
        </div>
        <label :for="uid" class="bx--label">{{label}}</label>
      </div>
      <cv-select class="bx--time-picker__select" inline hide-label :label="ampmSelectLabel" @change="onAmpmChange">
        <cv-select-option class="bx--select-option" value="AM" :selected="value.ampm === 'AM'">AM</cv-select-option>
        <cv-select-option class="bx--select-option" value="PM" :selected="value.ampm === 'PM'">PM</cv-select-option>
      </cv-select>

      <cv-select class="bx--time-picker__select" inline hide-label :label="timezonesSelectLabel" v-if="timezones.length > 0">
        <cv-select-option
          class="bx--select-option"
          v-for="timezone in timezones"
          :key="timezone.value"
          :selected="value.timezone === timezone.value"
          :value="timezone.value"
          @change="onTimezoneChange">{{timezone.label}}</cv-select-option>
      </cv-select>
    </div>
  </div>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import themeMixin from '../../mixins/theme-mixin';

const noModelValue = Symbol('no model value'); // a unique identifier

const setValueInner = (value, newValue) => {
  value.time = newValue.time || '';
  value.ampm = newValue.ampm || '';
  value.timezone = newValue.timezone || '';
};

const setValue = (value, modelValue, initialValue) => {
  if (modelValue === noModelValue) {
    setValueInner(value, initialValue);
  } else {
    setValueInner(value, modelValue);
  }
};

export default {
  name: 'CvTimePicker',
  mixins: [uidMixin, themeMixin],
  inheritAttrs: false,
  props: {
    _modelValue: { type: [Object, Symbol], default: noModelValue },
    ampmSelectLabel: { type: String, default: 'Select AM/PM' },
    initialValue: { type: String, default: '' },
    invalidMessage: { type: String, default: '' },
    label: { type: String, default: 'Select a time' },
    pattern: { type: String, default: '"(1[012]|[1-9]):[0-5][0-9](\\s)?(?i)' },
    placeholder: { type: String, default: 'hh:mm' },
    timezones: { type: Array, default: () => [] },
    timezonesSelectLabel: { type: String, default: 'Select time zone' },
  },
  data() {
    return {
      value: {
        type: Object,
        default: () => ({ time: '', ampm: '', timezone: '' }),
      },
    };
  },
  mounted() {
    setValue(this.value, this._modelValue, this.initialValue);
  },
  watch: {
    initialValue(val) {
      setValue(this.value, this._modelValue, val);
    },
    _modelValue(val) {
      setValue(this.value, val, this.initialValue);
    },
  },
  methods: {
    onInput(ev) {
      const result = { ...this.value };
      result.time = ev.target.value;
    },
    onAmpmChange(ev) {
      const result = { ...this.value };
      result.ampm = ev.target.value;
    },
    onTimezoneChange(ev) {
      const result = { ...this.value };
      result.timezone = ev.target.value;
    },
  },
};
</script>

<style lang="scss">
// Import Style Definitions
@import '~carbon-components/scss/components/time-picker/time-picker';
</style>
