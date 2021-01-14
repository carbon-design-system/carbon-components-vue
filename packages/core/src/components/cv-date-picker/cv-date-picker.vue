<template>
  <cv-wrapper :tag-type="formItem ? 'div' : ''" :class="`cv-date-picker ${carbonPrefix}--form-item`" :id="uid">
    <div
      :data-date-picker="['single', 'range'].includes(kind)"
      :data-date-picker-type="kind"
      :class="[
        `${this.carbonPrefix}--date-picker ${this.carbonPrefix}--date-picker--${this.kind}`,
        {
          [`${carbonPrefix}--date-picker--simple`]: this.kind === 'short',
          [`${carbonPrefix}--date-picker--light`]: isLight,
          'cv-date-pciker': !formItem,
        },
      ]"
      ref="date-picker"
      :id="formItem ? undefined : uid"
    >
      <div
        :class="{
          [`${carbonPrefix}--date-picker-container`]: ['single', 'range'].includes(kind),
          [`${carbonPrefix}--date-picker--nolabel`]: getDateLabel !== undefined,
        }"
        @change="onChange"
      >
        <label v-if="getDateLabel.length > 0" :for="`${uid}-input-1`" :class="`${carbonPrefix}--label`">
          {{ getDateLabel }}
        </label>
        <div :class="`${carbonPrefix}--date-picker-input__wrapper`">
          <input
            :data-invalid="isInvalid"
            type="text"
            :id="`${uid}-input-1`"
            :class="`${carbonPrefix}--date-picker__input`"
            :pattern="pattern"
            :placeholder="placeholder"
            data-date-picker-input
            :data-date-picker-input-from="kind === 'range'"
            ref="date"
          />
          <Calendar16
            v-if="['single', 'range'].includes(kind)"
            :class="`${carbonPrefix}--date-picker__icon`"
            data-date-picker-icon
            @click="cal.open()"
          />
        </div>
        <div :class="`${carbonPrefix}--form-requirement`" v-if="isInvalid">
          <slot name="invalid-message">{{ invalidMessage || invalidDateMessage }}</slot>
        </div>
      </div>
      <div :class="{ [`${carbonPrefix}--date-picker-container`]: kind === 'range' }" v-if="kind === 'range'">
        <label v-if="getDateEndLabel.length > 0" :for="`${uid}-input-2`" :class="`${carbonPrefix}--label`">
          {{ getDateEndLabel }}
        </label>
        <div :class="`${carbonPrefix}--date-picker-input__wrapper`">
          <input
            type="text"
            :id="`${uid}-input-2`"
            :class="`${carbonPrefix}--date-picker__input`"
            :pattern="pattern"
            :placeholder="placeholder"
            data-date-picker-input
            :data-date-picker-input-to="kind === 'range'"
            ref="todate"
          />
          <Calendar16 :class="`${carbonPrefix}--date-picker__icon`" data-date-picker-icon @click="openTodateCal()" />
        </div>
      </div>
    </div>
  </cv-wrapper>
</template>

<script>
import Flatpickr from 'flatpickr';
import l10n from 'flatpickr/dist/l10n/index';
// import carbonFlatpickrAppendToPlugin from './plugins/appendToPlugin';
import carbonFlatpickrFixEventsPlugin from './plugins/fixEventsPlugin';
import carbonFlatpickrRangePlugin from './plugins/rangePlugin';
import carbonFlatpickrMonthSelectPlugin from './plugins/monthSelectPlugin';

import { uidMixin, themeMixin, carbonPrefixMixin } from '../../mixins';
import Calendar16 from '@carbon/icons-vue/es/calendar/16';
import CvWrapper from '../cv-wrapper/_cv-wrapper';

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
  name: 'CvDatePicker',
  mixins: [uidMixin, themeMixin, carbonPrefixMixin],
  components: { Calendar16, CvWrapper },
  props: {
    dateLabel: { type: String, default: undefined },
    dateEndLabel: { type: String, default: undefined },
    formItem: { type: Boolean, default: true },
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
        if (val !== undefined && process.env.NODE_ENV === 'development') {
          console.warn('CvDatePicker: invalid prop deprecated in favour of invalidMessage');
        }
        return true;
      },
    },
    invalidDateMessage: /* deprecate */ {
      type: String,
      default: undefined,
      validator(val) {
        if (val !== undefined && process.env.NODE_ENV === 'development') {
          console.warn('CvDatePicker: invalidDateMessage deprecated in favour of invalidMessage');
        }
        return true;
      },
    },
    invalidMessage: { type: String, default: undefined },
    value: [String, Object, Array, Date],
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  data() {
    return {
      dataValue: this.value,
      dataOptions: {},
      isInvalid: false,
    };
  },
  watch: {
    value() {
      if (this.isSingle) {
        this.cal.setDate(this.value, true);
      } else if (this.isRange) {
        this.cal.setDate([this.value.startDate, this.value.endDate], true);
      } else {
        this.$refs.date.value = this.value;
      }
      this.dataValue = this.value;
    },
    calOptions() {
      this.initFlatpickr();
    },
    kind() {
      this.initFlatpickr();
    },
    invalidMessage() {
      this.checkSlots();
    },
  },
  computed: {
    getDateLabel() {
      if (this.dateLabel !== undefined) {
        return this.dateLabel;
      } else {
        if (this.isRange) {
          return 'Start date';
        } else {
          return 'Date';
        }
      }
    },
    getDateEndLabel() {
      if (this.dateEndLabel !== undefined) {
        return this.dateEndLabel;
      } else {
        if (this.isRange) {
          return 'End date';
        } else {
          return '';
        }
      }
    },
    isRange() {
      return this.kind === 'range';
    },
    isSingle() {
      return this.kind === 'single';
    },
  },
  methods: {
    checkSlots() {
      // NOTE: this.$slots is not reactive so needs to be managed on updated
      this.isInvalid = !!(
        this.$slots['invalid-message'] ||
        (this.invalidMessage && this.invalidMessage.length) ||
        (this.invalidDateMessage && this.invalidDateMessage.length)
      );
    },
    initFlatpickr() {
      if (['single', 'range'].includes(this.kind)) {
        // no need to call set value as it's done through getOptions
        this.cal = new Flatpickr(this.$refs.date, this.getOptions());
      }
    },
    getOptions() {
      const _options = { ...this.calOptions };

      // add events update based on parameters
      _options.onChange = this.onChange;
      _options.onOpen = this.onOpen;
      _options.onReady = this.onCalReady;

      // prefer value if set
      if (this.dataValue) {
        if (this.isRange) {
          _options.defaultDate = [this.dataValue.startDate, this.dataValue.endDate];
        } else {
          _options.defaultDate = this.dataValue;
        }
      }
      // _options.onValueUpdate = this.onChange;

      _options.plugins = [
        this.isRange
          ? carbonFlatpickrRangePlugin({
              input: this.$refs.todate,
            })
          : () => {},
        carbonFlatpickrMonthSelectPlugin({
          selectorFlatpickrMonthYearContainer: '.flatpickr-current-month',
          selectorFlatpickrYearContainer: '.numInputWrapper',
          selectorFlatpickrCurrentMonth: '.cur-month',
          classFlatpickrCurrentMonth: 'cur-month',
        }),
        carbonFlatpickrFixEventsPlugin({
          inputFrom: this.$refs.date,
          inputTo: this.$refs.todate,
        }),
      ];
      _options.nextArrow = `
      <svg width="16px" height="16px" viewBox="0 0 16 16">
        <polygon points="11,8 6,13 5.3,12.3 9.6,8 5.3,3.7 6,3 "/>
        <rect width="16" height="16" style="fill:none" />
      </svg>`;
      _options.prevArrow = `
      <svg width="16px" height="16px" viewBox="0 0 16 16">
        <polygon points="5,8 10,3 10.7,3.7 6.4,8 10.7,12.3 10,13 "/>
        <rect width="16" height="16" style="fill:none" />
      </svg>`;

      return _options;
    },
    onChange() {
      let firstDate, secondDate;
      let dateToString = val => {
        if (typeof val === 'number') {
          return this.cal.formatDate(val, this.calOptions.dateFormat);
        } else {
          return val || '';
        }
      };

      if (this.dataValue) {
        if (this.isRange) {
          firstDate = dateToString(this.dataValue.startDate);
          secondDate = dateToString(this.dataValue.endDate);
        } else {
          firstDate = dateToString(this.dataValue);
        }
      }

      if (this.isRange) {
        if (firstDate !== this.$refs.date.value || secondDate !== this.$refs.todate.value) {
          this.dataValue = {
            startDate: this.$refs.date.value,
            endDate: this.$refs.todate.value,
          };
          this.$emit('change', this.dataValue);
        }
      } else {
        if (firstDate !== this.$refs.date.value) {
          this.dataValue = this.$refs.date.value;
          this.$emit('change', this.dataValue);

          if (this.$listeners['simpleChange'] && process.env.NODE_ENV === 'development') {
            console.warn('CvDatePicker: simple change event deprecated in favour of change.');
            this.$emit('simpleChange', this.dataValue);
          }
        }
      }
    },
    onCalReady(selectedDates, dateString, instance) {
      const calendarContainer = instance.calendarContainer;
      const options = {
        classCalendarContainer: `${this.carbonPrefix}--date-picker__calendar`,
        classMonth: `${this.carbonPrefix}--date-picker__month`,
        classWeekdays: `${this.carbonPrefix}--date-picker__weekdays`,
        classDays: `${this.carbonPrefix}--date-picker__days`,
        classWeekday: `${this.carbonPrefix}--date-picker__weekday`,
        classDay: `${this.carbonPrefix}--date-picker__day`,
        classFocused: `${this.carbonPrefix}--focused`,
        classVisuallyHidden: `${this.carbonPrefix}--visually-hidden`,
      };

      if (calendarContainer) {
        calendarContainer.classList.add(options.classCalendarContainer);
        calendarContainer.querySelector('.flatpickr-month').classList.add(options.classMonth);
        calendarContainer.querySelector('.flatpickr-weekdays').classList.add(options.classWeekdays);
        calendarContainer.querySelector('.flatpickr-days').classList.add(options.classDays);
        for (const item of calendarContainer.querySelectorAll('.flatpickr-weekday')) {
          const currentItem = item;
          currentItem.innerHTML = currentItem.innerHTML.replace(/\s+/g, '');
          currentItem.classList.add(options.classWeekday);
        }
        for (const item of calendarContainer.querySelectorAll('.flatpickr-day')) {
          item.classList.add(options.classDay);
          if (item.classList.contains('today') && selectedDates.length > 0) {
            item.classList.add('no-border');
          } else if (item.classList.contains('today') && selectedDates.length === 0) {
            item.classList.remove('no-border');
          }
        }
      }
    },
    openTodateCal() {
      this.$refs.todate.click();
    },
  },
  mounted() {
    this.initFlatpickr();
    this.checkSlots();
    // this.cal.setDate([Date.now(), Date.now()]);
    // setTimeout(() => {
    //   let curDate = new Date();
    //   let anotherDate = new Date();
    //   anotherDate = anotherDate.setDate(anotherDate.getDate() + 16);
    //   this.cal.setDate([curDate, anotherDate], true);
    // }, 2000);
  },
  updated() {
    this.checkSlots();
  },
  beforeDestroy() {
    if (this.cal) {
      this.cal.destroy();
    }
  },
};
</script>
