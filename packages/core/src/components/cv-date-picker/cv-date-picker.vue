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
        }"
        @change="onSimpleChange"
      >
        <label :for="`${uid}-input-1`" class="bx--label">{{ getDateLabel }}</label>
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
        <label :for="`${uid}-input-2`" class="bx--label">{{ getDateEndLabel }}</label>
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
    dateLabel: String,
    dateEndLabel: String,
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
        if (val !== undefined) {
          console.warn('CvDatePicker: invalid prop deprecated in favour of invalidMessage');
        }
        return true;
      },
    },
    invalidDateMessage: /* deprecate */ {
      type: String,
      default: null,
      validator(val) {
        if (val !== null) {
          console.warn('CvDatePicker: invalidDateMessage deprecated in favour of invalidMessage');
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
      _options.onOpen = this.onOpen;
      _options.onReady = this.onCalReady;
      // _options.onValueUpdate = this.onChange;

      if (this.kind === 'range') {
        _options.plugins = [new RangePlugin({ input: this.$refs.todate, position: 'left' })];
      }

      return _options;
    },
    isInvalid() {
      return (
        this.$slots['invalid-message'] !== undefined ||
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
