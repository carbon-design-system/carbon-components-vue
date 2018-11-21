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
      <cv-select class="bx--time-picker__select" inline hide-label :label="ampmSelectLabel" @change="onAmpmChange" :disabled="disabled">
        <cv-select-option class="bx--select-option" value="AM" :selected="value.ampm === 'AM'">AM</cv-select-option>
        <cv-select-option class="bx--select-option" value="PM" :selected="value.ampm === 'PM'">PM</cv-select-option>
      </cv-select>

      <cv-select class="bx--time-picker__select" inline hide-label :label="timezonesSelectLabel" v-if="timezones.length > 0" @change="onTimezoneChange" :disabled="disabled">
        <cv-select-option
          class="bx--select-option"
          v-for="timezone in timezones"
          :key="timezone.value"
          :data-test="value.timezone"
          :selected="value.timezone === timezone.value"
          :value="timezone.value"
          >{{timezone.label}}</cv-select-option>
      </cv-select>
    </div>
  </div>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import themeMixin from '../../mixins/theme-mixin';

const noModelValue = Symbol('no model value'); // a unique identifier

export default {
  name: 'CvTimePicker',
  mixins: [uidMixin, themeMixin],
  inheritAttrs: false,
  props: {
    _modelValue: { type: [Object, Symbol], default: noModelValue },
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
    prop: '_modelValue',
    event: 'change',
  },
  mounted() {
    // console.dir(this.timezones);
  },
  computed: {
    value() {
      let _value;
      if (this._modelValue === noModelValue) {
        _value = { ...this.initialValue };
      } else {
        _value = { ...this._modelValue };
      }
      return _value;
    },
  },
  methods: {
    onInput(ev) {
      const result = { ...this.value };
      result.time = ev.target.value;
      this.$emit('change', result);
    },
    onAmpmChange(ev) {
      const result = { ...this.value };
      result.ampm = ev.target.value;
      this.$emit('change', result);
    },
    onTimezoneChange(ev) {
      const result = { ...this.value };
      result.timezone = ev.target.value;
      this.$emit('change', result);
    },
  },
};
</script>

<style lang="scss">
// Import Style Definitions
@import '~carbon-components/scss/components/time-picker/time-picker';
</style>
