<!--suppress ES6PreferShortImport -->
<template>
  <div :class="`cv-time-picker ${carbonPrefix}--form-item`">
    <div
      :class="[
        `${carbonPrefix}--time-picker`,
        `${carbonPrefix}--time-picker--${fieldSize}`,
        { [`${carbonPrefix}--time-picker--light`]: isLight },
      ]"
      :data-invalid="isInvalid || null"
    >
      <div :class="`${carbonPrefix}--time-picker__input`">
        <label :for="uid" :class="`${carbonPrefix}--label`">{{ label }}</label>
        <input
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
          :disabled="isDisabled"
          @input="onInput"
        />
      </div>
      <cv-select
        v-if="ampm !== TIME_PICKER_24"
        :class="`${carbonPrefix}--time-picker__select`"
        :form-item="false"
        hide-label
        :label="ampmSelectLabel"
        :value="ampm"
        :disabled="isDisabled"
        :size="fieldSize"
        @change="onChangeAMPM"
      >
        <cv-select-option
          :class="`${carbonPrefix}--select-option`"
          :value="TIME_PICKER_AM"
          >{{ TIME_PICKER_AM }}</cv-select-option
        >
        <cv-select-option
          :class="`${carbonPrefix}--select-option`"
          :value="TIME_PICKER_PM"
          >{{ TIME_PICKER_PM }}</cv-select-option
        >
      </cv-select>
      <div v-else>&nbsp;</div>

      <cv-select
        v-if="timezones.length > 0"
        :class="`${carbonPrefix}--time-picker__select`"
        :form-item="false"
        hide-label
        :label="timezonesSelectLabel"
        :value="validTimezone"
        :disabled="isDisabled"
        :size="fieldSize"
        @change="onChangeTimeZone"
      >
        <cv-select-option
          v-for="item in timezones"
          :key="item.value"
          :class="`${carbonPrefix}--select-option`"
          :value="item.value"
          >{{ item.label }}</cv-select-option
        >
      </cv-select>
    </div>
    <div v-if="isInvalid" :class="`${carbonPrefix}--form-requirement`">
      <slot name="invalid-message">{{ invalidMessage }}</slot>
    </div>
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { props as propsCvId, useCvId } from '../../use/cvId';
import { props as propsTheme, useIsLight } from '../../use/cvTheme';
import CvSelect from '../CvSelect/CvSelect.vue';
import CvSelectOption from '../CvSelect/CvSelectOption.vue';
import { computed, onMounted, onUpdated, ref, useSlots } from 'vue';
import {
  TIME_PICKER_SIZES,
  TIME_PICKER_HOURS,
  FIELD_MEDIUM,
  TIME_PICKER_AM,
  TIME_PICKER_PM,
  TIME_PICKER_24,
} from './index';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * Initial value for the AM/PM `<cv-select>`. If set to `24` the `<cv-select>` is not included.
   */
  ampm: {
    type: String,
    default: TIME_PICKER_AM,
    validator: value => TIME_PICKER_HOURS.includes(value),
  },
  /**
   * Label for the AM/PM `<cv-select>`
   */
  ampmSelectLabel: { type: String, default: 'Select AM/PM' },
  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled: { type: Boolean, default: false },
  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidMessage: { type: String, default: undefined },
  /**
   * Label for the time `<input>`
   */
  label: { type: String, default: 'Select a time' },
  /**
   * Specify the regular expression working as the [pattern](https://www.w3schools.com/tags/att_input_pattern.asp) of the time string in `<input>`.
   */
  pattern: { type: String, default: '([01][0-9]:[0-6][0-9])' },
  /**
   * Specify the placeholder attribute for the <input>
   */
  placeholder: { type: String, default: 'hh:mm' },
  /**
   * Specify the initial value of the `<input>`
   */
  time: { type: String, default: undefined },
  /**
   * Specify the initial value of the `<cv-select>` for the timezone
   */
  timezone: { type: String, default: undefined },
  /**
   * List of timezones to display
   * @type {Array<{value: string, label:string}>}
   */
  timezones: {
    type: Array,
    default: () => [],
  },
  /**
   * Specify the label of the `<cv-select>` for the timezone. Label is hidden but text will be read by a screen reader when visiting this control.
   */
  timezonesSelectLabel: { type: String, default: 'Select time zone' },
  /**
   * Specify the size of the Time Picker.
   */
  fieldSize: {
    type: String,
    default: FIELD_MEDIUM,
    validator: value => TIME_PICKER_SIZES.includes(value),
  },
  ...propsCvId,
  ...propsTheme,
});

const uid = useCvId(props, true);
const isLight = useIsLight(props);

const isInvalid = ref(false);
const slots = useSlots();
function checkSlots() {
  // NOTE: slots is not reactive so needs to be managed on updated
  isInvalid.value = !!(
    slots['invalid-message'] ||
    (props.invalidMessage && props.invalidMessage.length)
  );
}
onMounted(checkSlots);
onUpdated(checkSlots);

const emit = defineEmits([
  'change',
  'update:ampm',
  'update:timezone',
  'update:time',
]);

const validTimezone = computed(() => {
  // Validate timezone setting
  let result = props.timezone;
  if (props.timezones && props.timezones.length) {
    if (!props.timezones.find(item => item.value === props.timezone)) {
      if (props.timezone !== undefined)
        console.error(
          `CvTimePicker: invalid value '${props.timezone}' supplied for prop timezone. Default applied.`
        );
      // set to first valid value
      result = props.timezones[0].value;
      emit('update:timezone', result);
    }
  }
  return result;
});
const isDisabled = computed(() => (props.disabled ? true : undefined));

function onInput(e) {
  emit('change', { type: 'time', value: e?.target?.value });
  emit('update:time', e?.target?.value);
}
function onChangeAMPM(value) {
  emit('change', { type: 'ampm', value });
  emit('update:ampm', value);
}
function onChangeTimeZone(value) {
  emit('change', { type: 'timezone', value });
  emit('update:timezone', value);
}
</script>
