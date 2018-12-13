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
          :value="time"
          @input="$emit('update:time', $event.target.value)"
          ref="time"
        >
        <div class="bx--form-requirement" v-if="invalidMessage.length > 0">{{invalidMessage}}</div>
        <label :for="uid" class="bx--label">{{label}}</label>
      </div>
      <cv-select
        class="bx--time-picker__select"
        inline
        hide-label
        :label="ampmSelectLabel"
        @input="$emit('update:ampm', $event)"
        :value="ampm"
        :disabled="disabled"
        ref="ampm"
      >
        <cv-select-option class="bx--select-option" value="AM">AM</cv-select-option>
        <cv-select-option class="bx--select-option" value="PM">PM</cv-select-option>
      </cv-select>

      <cv-select
        class="bx--time-picker__select"
        inline
        hide-label
        :label="timezonesSelectLabel"
        v-if="timezones.length > 0"
        :value="internalTimezone"
        @input="$emit('update:timezone', $event)"
        :disabled="disabled"
        ref="timezone"
      >
        <cv-select-option
          class="bx--select-option"
          v-for="item in timezones"
          :key="item.value"
          :value="item.value"
        >{{item.label}}</cv-select-option>
      </cv-select>
    </div>
  </div>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import themeMixin from '../../mixins/theme-mixin';

export default {
  name: 'CvTimePicker',
  mixins: [uidMixin, themeMixin],
  inheritAttrs: false,
  props: {
    ampm: {
      type: String,
      default: 'AM',
      validator: val => ['AM', 'PM'].includes(val),
    },
    ampmSelectLabel: { type: String, default: 'Select AM/PM' },
    disabled: Boolean,
    invalidMessage: { type: String, default: '' },
    label: { type: String, default: 'Select a time' },
    pattern: { type: String, default: '([01][0-9]:[0-6][0-9])' },
    placeholder: { type: String, default: 'hh:mm' },
    time: String,
    timezone: String,
    timezones: { type: Array, default: () => [] },
    timezonesSelectLabel: { type: String, default: 'Select time zone' },
  },
  computed: {
    internalTimezone() {
      // Validate timezone setting
      let result = this.timezone;
      if (this.timezones && this.timezones.length) {
        if (!this.timezones.find(item => item.value === this.timezone)) {
          // set to first valid value
          result = this.timezones[0].value;
          this.$emit('update:timezone', result);
        }
      }
      return result;
    },
  },
};
</script>

<style lang="scss">
</style>
