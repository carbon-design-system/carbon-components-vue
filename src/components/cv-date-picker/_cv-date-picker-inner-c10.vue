<template>
  <div class="cv-date-picker bx--form-item">
    <div
      :data-date-picker="['single', 'range'].includes(kind)"
      :data-date-picker-type="kind"
      class="bx--date-picker"
      :class="[kindClasses, { 'bx--date-picker--light': theme === 'light' }]"
      ref="date-picker"
    >
      <div
        :class="{
          'bx--date-picker-container': ['single', 'range'].includes(kind),
        }"
        @change="onSimpleChange"
      >
        <label :for="`${uid}-input-1`" class="bx--label">{{
          getDateLabel
        }}</label>
        <div class="bx--date-picker-input__wrapper">
          <input
            :data-invalid="isInvalid"
            type="text"
            :id="`${uid}-input-1`"
            class="bx--date-picker__input"
            :pattern="pattern"
            :placeholder="placeholder"
            data-date-picker-input
            :data-date-picker-input-from="kind === 'range'"
            ref="date"
          />
          <Calendar16
            v-if="['single', 'range'].includes(kind)"
            class="bx--date-picker__icon"
            data-date-picker-icon
            @click="cal.open()"
          />
        </div>
        <div class="bx--form-requirement" v-if="isInvalid">
          <slot name="invalid-message">{{
            invalidMessage || invalidDateMessage
          }}</slot>
        </div>
      </div>
      <div
        :class="{ 'bx--date-picker-container': kind === 'range' }"
        v-if="kind === 'range'"
      >
        <label :for="`${uid}-input-2`" class="bx--label">{{
          getDateEndLabel
        }}</label>
        <div class="bx--date-picker-input__wrapper">
          <input
            type="text"
            :id="`${uid}-input-2`"
            class="bx--date-picker__input"
            :pattern="pattern"
            :placeholder="placeholder"
            data-date-picker-input
            :data-date-picker-input-to="kind === 'range'"
            ref="todate"
          />
          <Calendar16
            class="bx--date-picker__icon"
            data-date-picker-icon
            @click="cal.open()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Flatpickr from 'flatpickr';
import l10n from 'flatpickr/dist/l10n/index';
import RangePlugin from 'flatpickr/dist/plugins/rangePlugin';
import uidMixin from '../../mixins/uid-mixin';
import themeMixin from '../../mixins/theme-mixin';
import Calendar16 from '@carbon/icons-vue/lib/calendar/16';

// Weekdays shorthand for english locale
l10n.en.weekdays.shorthand.forEach((day, index) => {
  const currentDay = l10n.en.weekdays.shorthand;
  if (currentDay[index] === 'Thu' || currentDay[index] === 'Th') {
    currentDay[index] = 'Th';
  } else {
    currentDay[index] = currentDay[index].charAt(0);
  }
});

export default {
  name: 'CvDatePickerInnerC10',
  mixins: [uidMixin, themeMixin],
  components: { Calendar16 },
  props: {
    dateLabel: String,
    dateEndLabel: String,
    kind: {
      type: String,
      default: 'simple',
      validator: val => ['short', 'simple', 'single', 'range'].includes(val),
    },
    calOptions: {
      type: Object,
      default: () => {
        return {
          dateFormat: 'm/d/Y',
        };
      },
    },
    pattern: { type: String, default: '\\d{1,2}/\\d{1,2}/\\d{4}' },
    placeholder: { type: String, default: 'mm/dd/yyyy' },
    invalid: /* deprecate */ {
      type: Boolean,
      default: undefined,
      validator(val) {
        if (val !== undefined) {
          console.warn(
            'CvDatePicker: invalid prop deprecated in favour of invalidMessage'
          );
        }
        return true;
      },
    },
    invalidDateMessage: /* deprecate */ {
      type: String,
      default: null,
      validator(val) {
        if (val !== null) {
          console.warn(
            'CvDatePicker: invalidDateMessage deprecated in favour of invalidMessage'
          );
        }
        return true;
      },
    },
    invalidMessage: { type: String, default: null },
  },
  computed: {
    kindClasses() {
      if (this.kind === 'short') {
        return 'bx--date-picker--short bx--date-picker--simple';
      }
      return `bx--date-picker--${this.kind}`;
    },
    getDateLabel() {
      if (this.dateLabel && this.dateLabel.length) {
        return this.dateLabel;
      } else {
        if (this.kind === 'range') {
          return 'Start date';
        } else {
          return 'Date';
        }
      }
    },
    getDateEndLabel() {
      if (this.dateEndLabel && this.dateEndLabel.length) {
        return this.dateEndLabel;
      } else {
        if (this.kind === 'range') {
          return 'End date';
        } else {
          return '';
        }
      }
    },
    getOptions() {
      const _options = { ...this.calOptions };

      // add events update based on parameters
      _options.onChange = this.onChange;
      // _options.onValueUpdate = this.onChange;

      if (this.kind === 'range') {
        _options.plugins = [new RangePlugin({ input: this.$refs.todate })];
      }

      return _options;
    },
    isInvalid() {
      return (
        this.$slots['invalid-message'] ||
        (this.invalidMessage && this.invalidMessage.length) ||
        (this.invalidDateMessage && this.invalidDateMessage.length)
      );
    },
  },
  methods: {
    onChange() {
      // this.$emit('change', ev); // this is a property time
      if (this.kind === 'range') {
        this.$emit('change', {
          startDate: this.$refs.date.value,
          endDate: this.$refs.todate.value,
        });
      } else {
        this.$emit('change', this.$refs.date.value);
      }
    },
    onSimpleChange(ev) {
      if (!['single', 'range'].includes(this.kind)) {
        this.$emit('simpleChange', ev.target.value);
      }
    },
  },
  mounted() {
    if (['single', 'range'].includes(this.kind)) {
      this.cal = new Flatpickr(this.$refs.date, this.getOptions);
    }
  },
  beforeDestroy() {
    if (this.cal) {
      this.cal.destroy();
    }
  },
};
</script>

<style lang="scss"></style>
