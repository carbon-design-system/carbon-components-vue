<template>
  <div :class="`cv-time-picker ${carbonPrefix}--form-item`">
    <div
      :class="[`${carbonPrefix}--time-picker`, { [`${carbonPrefix}--time-picker--light`]: isLight }]"
      :data-invalid="isInvalid"
    >
      <div :class="`${carbonPrefix}--time-picker__input`">
        <label :for="uid" :class="`${carbonPrefix}--label`">{{ label }}</label>
        <input
          ref="input"
          :id="uid"
          type="text"
          :class="[
            `${carbonPrefix}--time-picker__input-field ${carbonPrefix}--text-input`,
            { [`${carbonPrefix}--text-input--light`]: isLight },
          ]"
          :pattern="pattern"
          v-bind="$attrs"
          :placeholder="placeholder"
          :maxlength="placeholder.length"
          :value="time"
          :disabled="disabled"
          @input="$emit('update:time', $event.target.value)"
        />
      </div>
      <cv-select
        v-if="ampm !== '24'"
        :class="`${carbonPrefix}--time-picker__select`"
        :form-item="false"
        hide-label
        :label="ampmSelectLabel"
        @change="$emit('update:ampm', $event)"
        :value="ampm"
        :disabled="disabled"
      >
        <cv-select-option :class="`${carbonPrefix}--select-option`" value="AM">AM</cv-select-option>
        <cv-select-option :class="`${carbonPrefix}--select-option`" value="PM">PM</cv-select-option>
      </cv-select>
      <div v-else v-html="`&nbsp;`"></div>

      <cv-select
        :class="`${carbonPrefix}--time-picker__select`"
        :form-item="false"
        hide-label
        :label="timezonesSelectLabel"
        v-if="timezones.length > 0"
        :value="validTimezone"
        @change="$emit('update:timezone', $event)"
        :disabled="disabled"
      >
        <cv-select-option
          :class="`${carbonPrefix}--select-option`"
          v-for="item in timezones"
          :key="item.value"
          :value="item.value"
          >{{ item.label }}</cv-select-option
        >
      </cv-select>
    </div>
    <div :class="`${carbonPrefix}--form-requirement`" v-if="isInvalid">
      <slot name="invalid-message">{{ invalidMessage }}</slot>
    </div>
  </div>
</template>

<script>
import { uidMixin, themeMixin, carbonPrefixMixin, methodsMixin } from '../../mixins';
import CvSelect from '../cv-select/cv-select';
import CvSelectOption from '../cv-select/cv-select-option';

export default {
  name: 'CvTimePicker',
  components: {
    CvSelect,
    CvSelectOption,
  },
  mixins: [uidMixin, themeMixin, carbonPrefixMixin, methodsMixin({ input: ['blur', 'focus'] })],
  inheritAttrs: false,
  props: {
    ampm: {
      type: String,
      default: 'AM',
    },
    ampmSelectLabel: { type: String, default: 'Select AM/PM' },
    disabled: Boolean,
    invalidMessage: { type: String, default: undefined },
    label: { type: String, default: 'Select a time' },
    pattern: { type: String, default: '([01][0-9]:[0-6][0-9])' },
    placeholder: { type: String, default: 'hh:mm' },
    time: String,
    timezone: String,
    timezones: { type: Array, default: () => [] },
    timezonesSelectLabel: { type: String, default: 'Select time zone' },
  },
  data() {
    return {
      isInvalid: false,
    };
  },
  mounted() {
    this.checkSlots();
  },
  updated() {
    this.checkSlots();
  },
  computed: {
    validAmpm() {
      let result = this.ampm;
      if (!['AM', 'PM', '24'].includes(this.ampm)) {
        console.error(`CvTimePicker: invalid value '${this.ampm}' supplied for prop ampm. Default applied.`);
        // set to valid value
        result = this.ampm[0].value;
        this.$emit('update:ampm', result);
      }
      return result;
    },
    validTimezone() {
      // Validate timezone setting
      let result = this.timezone;
      if (this.timezones && this.timezones.length) {
        if (!this.timezones.find(item => item.value === this.timezone)) {
          console.error(`CvTimePicker: invalid value '${this.timezone}' supplied for prop timezone. Default applied.`);
          // set to first valid value
          result = this.timezones[0].value;
          this.$emit('update:timezone', result);
        }
      }
      return result;
    },
  },
  methods: {
    checkSlots() {
      // NOTE: this.$slots is not reactive so needs to be managed on updated
      this.isInvalid = !!(this.$slots['invalid-message'] || (this.invalidMessage && this.invalidMessage.length));
    },
  },
};
</script>
