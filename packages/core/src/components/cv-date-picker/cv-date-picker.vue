<template>
  <cv-wrapper :tag-type="formItem ? 'div' : ''" class="cv-date-picker bx--form-item">
    <div
      :data-date-picker="['single', 'range'].includes(kind)"
      :data-date-picker-type="kind"
      class="bx--date-picker"
      :class="[kindClasses, { 'bx--date-picker--light': theme === 'light', 'cv-date-pciker': !formItem }]"
      ref="date-picker"
    >
      <div
        :class="{
          'bx--date-picker-container': ['single', 'range'].includes(kind),
          'bx--date-picker--nolabel': getDateLabel !== undefined,
        }"
        @change="onChange"
      >
        <label v-if="getDateLabel.length > 0" :for="`${uid}-input-1`" class="bx--label">{{ getDateLabel }}</label>
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
          <slot name="invalid-message">{{ invalidMessage || invalidDateMessage }}</slot>
        </div>
      </div>
      <div :class="{ 'bx--date-picker-container': kind === 'range' }" v-if="kind === 'range'">
        <label v-if="getDateEndLabel.length > 0" :for="`${uid}-input-2`" class="bx--label">{{ getDateEndLabel }}</label>
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
          <Calendar16 class="bx--date-picker__icon" data-date-picker-icon @click="openTodateCal()" />
        </div>
      </div>
    </div>
  </cv-wrapper>
</template>

<script>
import Flatpickr from 'flatpickr';
import l10n from 'flatpickr/dist/l10n/index';
import RangePlugin from 'flatpickr/dist/plugins/rangePlugin';
import uidMixin from '../../mixins/uid-mixin';
import themeMixin from '../../mixins/theme-mixin';
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
  mixins: [uidMixin, themeMixin],
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
    value: [String, Object, Array],
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
  },
  computed: {
    kindClasses() {
      if (this.kind === 'short') {
        return 'bx--date-picker--short bx--date-picker--simple';
      }
      return `bx--date-picker--${this.kind}`;
    },
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
      // NOTE: this.$slots is not reactive so needs to be managed on beforeUpdate
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

      if (this.isRange) {
        // let curDate = new Date();
        // let anotherDate = new Date();
        // anotherDate = anotherDate.setDate(anotherDate.getDate() + 6);
        // _options.defaultDate = [curDate, anotherDate];
        _options.plugins = [new RangePlugin({ input: this.$refs.todate, position: 'left' })];
      }

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
        classCalendarContainer: `bx--date-picker__calendar`,
        classMonth: `bx--date-picker__month`,
        classWeekdays: `bx--date-picker__weekdays`,
        classDays: `bx--date-picker__days`,
        classWeekday: `bx--date-picker__weekday`,
        classDay: `bx--date-picker__day`,
        classFocused: `bx--focused`,
        classVisuallyHidden: `bx--visually-hidden`,
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
  beforeUpdate() {
    this.checkSlots();
  },
  beforeDestroy() {
    if (this.cal) {
      this.cal.destroy();
    }
  },
};
</script>
