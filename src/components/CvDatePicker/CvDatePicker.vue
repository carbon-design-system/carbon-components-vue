<template>
  <cv-wrapper
    :tag-type="formItem ? 'div' : ''"
    :class="`cv-date-picker ${carbonPrefix}--form-item`"
    :id="cvId"
  >
    <div
      :data-date-picker="['single', 'range'].includes(getKind)"
      :data-date-picker-type="getKind"
      :class="[
        `${carbonPrefix}--date-picker ${carbonPrefix}--date-picker--${getKind}`,
        {
          [`${carbonPrefix}--date-picker--simple`]: getKind === 'short',
          [`${carbonPrefix}--date-picker--light`]: isLight,
          'cv-date-pciker': !formItem,
        },
      ]"
      ref="dateWrapper"
      :id="formItem ? undefined : cvId"
    >
      <div
        :class="{
          [`${carbonPrefix}--date-picker-container`]: [
            'single',
            'range',
          ].includes(getKind),
          [`${carbonPrefix}--date-picker--nolabel`]: getDateLabel !== undefined,
        }"
        @change="onChange"
      >
        <label
          v-if="getDateLabel.length > 0"
          :for="`${cvId}-input-1`"
          :class="`${carbonPrefix}--label`"
        >
          {{ getDateLabel }}
        </label>
        <div :class="`${carbonPrefix}--date-picker-input__wrapper`">
          <input
            ref="date"
            type="text"
            data-date-picker-input
            :data-invalid="isInvalid || null"
            :disabled="disabled"
            :data-date-picker-input-from="getKind === 'range'"
            :id="`${cvId}-input-1`"
            :class="`${carbonPrefix}--date-picker__input`"
            :pattern="pattern"
            :placeholder="placeholder"
            :value="getStartDate"
            @change="handleUpdateEvent"
            @click="handleClick"
          />
          <Calendar16
            v-if="['single', 'range'].includes(getKind)"
            :class="`${carbonPrefix}--date-picker__icon`"
            data-date-picker-icon
          />
        </div>

        <div :class="`${carbonPrefix}--form-requirement`" v-if="isInvalid">
          <slot name="invalid-message">{{ invalidMessage }}</slot>
        </div>
      </div>

      <!-- maybe use input as another component? -->
      <div
        v-if="isRange"
        :class="{
          [`${carbonPrefix}--date-picker-container`]: getKind === 'range',
          [`${carbonPrefix}--date-picker--nolabel`]: dateEndLabel !== undefined,
        }"
      >
        <label
          v-if="dateEndLabel.length > 0"
          :for="`${cvId}-input-2`"
          :class="`${carbonPrefix}--label`"
        >
          {{ dateEndLabel }}
        </label>
        <div
          :class="`${carbonPrefix}--date-picker-input__wrapper`"
          @click="calendar.open()"
        >
          <input
            ref="todate"
            type="text"
            data-date-picker-input
            :data-date-picker-input-to="kind === 'range'"
            :data-invalid="isInvalid || null"
            :disabled="disabled"
            :id="`${cvId}-input-2`"
            :class="`${carbonPrefix}--date-picker__input`"
            :pattern="pattern"
            :placeholder="placeholder"
            :value="getEndDate"
            @change="handleUpdateEvent"
          />
          <Calendar16
            :class="`${carbonPrefix}--date-picker__icon`"
            data-date-picker-icon
          />
        </div>
        <div :class="`${carbonPrefix}--form-requirement`" v-if="isInvalid">
          <span id="invalid-message-placeholder"></span>
        </div>
      </div>
    </div>
  </cv-wrapper>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onUpdated,
  watch,
  nextTick,
  useSlots,
} from 'vue';
import { carbonPrefix } from '../../global/settings';
import { props as propsCvId, useCvId } from '../../use/cvId';
import { Calendar16 } from '@carbon/icons-vue';
import CvWrapper from '../CvWrapper/CvWrapper';
import { props as propsCvTheme, useIsLight } from '../../use/cvTheme';
import flatpickr from 'flatpickr';
import l10n from 'flatpickr/dist/l10n/index';
// import carbonFlatpickrAppendToPlugin from './plugins/appendToPlugin';
import carbonFlatpickrFixEventsPlugin from './plugins/fixEventsPlugin';
import carbonFlatpickrRangePlugin from './plugins/rangePlugin';
import carbonFlatpickrMonthSelectPlugin from './plugins/monthSelectPlugin';

const dateWrapper = ref(null);
const date = ref(null);
const todate = ref(null);

const cvId = useCvId(props, true, 'date-picker-');
const isLight = useIsLight(props);

let calendar;

const props = defineProps({
  modelValue: String,
  dateLabel: { type: String, default: undefined },
  dateEndLabel: { type: String, default: 'End date' },
  invalid: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  invalidMessage: { type: String },
  pattern: { type: String, default: '\\d{1,2}/\\d{1,2}/\\d{4}' },
  placeholder: { type: String, default: 'mm/dd/yyyy' },
  calOptions: {
    type: Object,
    default() {
      return {
        dateFormat: 'm/d/Y',
      };
    },
  },
  formItem: { type: Boolean, default: true },
  kind: {
    type: String,
    default: 'simple',
    validator: val => ['short', 'simple', 'single', 'range'].includes(val),
  },
  value: [String, Object, Array, Date],
  ...propsCvId,
  ...propsCvTheme,
});

const emit = defineEmits(['update:modelValue']);

const getKind = computed({
  get() {
    if (['short', 'simple', 'single', 'range'].includes(props.kind)) {
      return props.kind;
    }

    return 'simple';
  },
});

const getDateLabel = computed({
  get() {
    if (props.kind === 'range' && !props.dateLabel) {
      return 'Start date';
    }

    if (!props.dateLabel) {
      return 'Date Label';
    }

    return props.dateLabel;
  },
});

const getStartDate = computed({
  get() {
    return (
      props.modelValue?.startDate ||
      props.modelValue ||
      props.value?.startDate ||
      props.value
    );
  },
});

const getEndDate = computed({
  get() {
    return props.modelValue?.endDate || props.value?.endDate;
  },
});

const isRange = computed(() => {
  return props.kind === 'range';
});

const isSingle = computed(() => {
  return props.kind === 'single';
});

const isInvalid = computed(() => {
  return !!props.invalidMessage;
});

const getFlatpickrOptions = () => {
  const options = { ...props.calOptions };

  options.plugins = [
    props.kind === 'range'
      ? carbonFlatpickrRangePlugin({
          input: todate.value,
        })
      : () => {},
    carbonFlatpickrMonthSelectPlugin({
      selectorFlatpickrMonthYearContainer: '.flatpickr-current-month',
      selectorFlatpickrYearContainer: '.numInputWrapper',
      selectorFlatpickrCurrentMonth: '.cur-month',
      classFlatpickrCurrentMonth: 'cur-month',
    }),
    carbonFlatpickrFixEventsPlugin({
      inputFrom: date.value,
      inputTo: todate.value,
    }),
  ];

  options.nextArrow = `
    <svg width="16px" height="16px" viewBox="0 0 16 16">
      <polygon points="11,8 6,13 5.3,12.3 9.6,8 5.3,3.7 6,3 "/>
      <rect width="16" height="16" style="fill:none" />
    </svg>
  `;

  options.prevArrow = `
    <svg width="16px" height="16px" viewBox="0 0 16 16">
      <polygon points="5,8 10,3 10.7,3.7 6.4,8 10.7,12.3 10,13 "/>
      <rect width="16" height="16" style="fill:none" />
    </svg>
  `;

  options.mode = props.kind;
  // add events update based on parameters
  options.onChange = handleDatePick;
  // options.onOpen = onOpen;
  options.onReady = onCalReady;

  return options;
};

const onCalReady = (selectedDates, dateStr, instance) => {
  const calendarContainer = instance.calendarContainer;
  const options = {
    classCalendarContainer: `${carbonPrefix}--date-picker__calendar`,
    classMonth: `${carbonPrefix}--date-picker__month`,
    classWeekdays: `${carbonPrefix}--date-picker__weekdays`,
    classDays: `${carbonPrefix}--date-picker__days`,
    classWeekday: `${carbonPrefix}--date-picker__weekday`,
    classDay: `${carbonPrefix}--date-picker__day`,
    classFocused: `${carbonPrefix}--focused`,
    classVisuallyHidden: `${carbonPrefix}--visually-hidden`,
  };

  if (calendarContainer) {
    calendarContainer.classList.add(options.classCalendarContainer);
    calendarContainer
      .querySelector('.flatpickr-month')
      .classList.add(options.classMonth);
    calendarContainer
      .querySelector('.flatpickr-weekdays')
      .classList.add(options.classWeekdays);
    calendarContainer
      .querySelector('.flatpickr-days')
      .classList.add(options.classDays);
    for (const item of calendarContainer.querySelectorAll(
      '.flatpickr-weekday'
    )) {
      const currentItem = item;
      currentItem.innerHTML = currentItem.innerHTML.replace(/\s+/g, '');
      currentItem.classList.add(options.classWeekday);
    }
    for (const item of calendarContainer.querySelectorAll('.flatpickr-day')) {
      item.classList.add(options.classDay);
      if (item.classList.contains('today') && selectedDates.length > 0) {
        item.classList.add('no-border');
      } else if (
        item.classList.contains('today') &&
        selectedDates.length === 0
      ) {
        item.classList.remove('no-border');
      }
    }
  }
};

const initFlatpickr = () => {
  return flatpickr(date.value, getFlatpickrOptions());
};

let dateToString = val => {
  return calendar.formatDate(val, props.calOptions.dateFormat);
};

const handleDatePick = (selectedDates, dateStr, instance) => {
  if (selectedDates.length === 1) {
    const temp = dateToString(selectedDates[0]);

    nextTick(() => {
      date.value.value = temp;
    });

    emit('update:modelValue', temp);
  } else {
    const startDate = dateToString(selectedDates[0]);
    const endDate = dateToString(selectedDates[1]);

    nextTick(() => {
      date.value.value = startDate;
      todate.value.value = endDate;
    });

    emit('update:modelValue', {
      startDate: startDate,
      endDate: endDate,
    });
  }
};

const handleUpdateEvent = event => {
  if (['short', 'simple'].includes(props.kind)) {
    emit('update:modelValue', event.target.value);
  }
};

onMounted(() => {
  if (['range', 'single'].includes(props.kind)) {
    calendar = initFlatpickr();
  }
});
</script>

<style lang="scss">
#invalid-message-placeholder {
  display: block;
  height: 16px;
}
</style>
