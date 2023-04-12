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
            @click="console.log($event.target)"
          />
        </div>
      </div>

      <!-- maybe use input as another component? -->
      <div
        v-if="getKind === 'range'"
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
            @click="console.log($event)"
          />
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
  invalidText: { type: String },
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
    if (props.getKind === 'range' && !props.dateLabel) {
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
    if (props.modelValue) {
      return props.modelValue?.startDate || props.modelValue;
    }
  },
});

const getEndDate = computed({
  get() {
    if (props.modelValue) {
      return props.modelValue?.endDate || props.modelValue;
    }
  },
});

const getFlatpickrOptions = () => {
  const options = { ...props.calOptions };

  options.mode = props.kind;
  options.onChange = handleDatePick;

  return options;
};

const initFlatpickr = () => {
  return flatpickr(date.value, getFlatpickrOptions());
};

let dateToString = val => {
  if (typeof val === 'number') {
    return this.cal.formatDate(val, this.calOptions.dateFormat);
  } else {
    return val || '';
  }
};

const handleDatePick = (selectedDates, dateStr, instance) => {
  if (selectedDates.length === 1) {
    const temp = calendar.formatDate(
      selectedDates[0],
      props.calOptions.dateFormat
    );

    nextTick(() => {
      date.value.value = temp;
    });

    emit('update:modelValue', temp);
  } else {
    const startDate = calendar.formatDate(
      selectedDates[0],
      props.calOptions.dateFormat
    );
    const endDate = calendar.formatDate(
      selectedDates[1],
      props.calOptions.dateFormat
    );

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

<style lang="scss"></style>
