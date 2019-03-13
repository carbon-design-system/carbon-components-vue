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
        <svg
          v-if="kind === 'single'"
          data-date-picker-icon
          class="bx--date-picker__icon"
          width="14"
          height="16"
          viewBox="0 0 14 16"
          @click="cal.open()"
        >
          <path
            d="M0 5h14v1H0V5zm3-5h1v4H3V0zm7 0h1v4h-1V0zM0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 0 14.5v-12zm1 0v12a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5z"
            fill-rule="nonzero"
          ></path>
        </svg>
        <label :for="`${uid}-input-1`" class="bx--label">{{
          getDateLabel
        }}</label>
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
      </div>
      <svg
        v-if="kind === 'range'"
        data-date-picker-icon
        class="bx--date-picker__icon"
        width="14"
        height="16"
        viewBox="0 0 14 16"
        @click="cal.open()"
      >
        <path
          d="M0 5h14v1H0V5zm3-5h1v4H3V0zm7 0h1v4h-1V0zM0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 0 14.5v-12zm1 0v12a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5z"
          fill-rule="nonzero"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>
import Flatpickr from 'flatpickr';
import l10n from 'flatpickr/dist/l10n/index';
import RangePlugin from 'flatpickr/dist/plugins/rangePlugin';
import uidMixin from '../../mixins/uid-mixin';
import themeMixin from '../../mixins/theme-mixin';

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
  name: 'CvDatePickerInner',
  mixins: [uidMixin, themeMixin],
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
