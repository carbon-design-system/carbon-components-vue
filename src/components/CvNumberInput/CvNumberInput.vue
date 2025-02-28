<template>
  <cv-wrapper
    :tag-type="formItem ? 'div' : ''"
    class="cv-number-input"
    :class="`${carbonPrefix}--form-item`"
  >
    <div
      :class="[
        `${carbonPrefix}--number`,
        {
          [`${carbonPrefix}--number--light`]: isLight,
          [`${carbonPrefix}--number--helpertext`]: isHelper,
          [`${carbonPrefix}--number--sm`]: size === 'sm',
          [`${carbonPrefix}--number--md`]: size === 'md',
          [`${carbonPrefix}--number--lg`]: size === 'lg',
          [`cv-number-input`]: !formItem,
        },
      ]"
      :data-invalid="isInvalid || null"
    >
      <label
        v-show="label || slots['label']"
        :for="cvId"
        :class="`${carbonPrefix}--label`"
      >
        <slot name="label">
          {{ label }}
        </slot>
      </label>

      <div
        :class="[
          `${carbonPrefix}--number__input-wrapper`,
          { [`${carbonPrefix}--number__input-wrapper--warning`]: isWarn },
        ]"
      >
        <input
          :id="cvId"
          ref="input"
          v-model="internalValue"
          :data-invalid="isInvalid || null"
          type="number"
          v-bind="$attrs"
          :disabled="disabled || null"
          :step="step"
          :min="min"
          :max="max"
        />

        <WarningFilled16 v-if="isInvalid" :class="iconClasses" />

        <WarningAltFilled16 v-if="isWarn && !isInvalid" :class="iconClasses" />

        <div :class="`${carbonPrefix}--number__controls`">
          <button
            :class="`${carbonPrefix}--number__control-btn down-icon`"
            type="button"
            :aria-label="ariaLabelForDownButton"
            :disabled="disabled || null"
            aria-live="polite"
            aria-atomic="true"
            @click="doDown"
          >
            <Subtract16 class="down-icon" />
          </button>

          <div :class="`${carbonPrefix}--number__rule-divider`" />

          <button
            :class="`${carbonPrefix}--number__control-btn up-icon`"
            type="button"
            :aria-label="ariaLabelForUpButton"
            :disabled="disabled || null"
            aria-live="polite"
            aria-atomic="true"
            @click="doUp"
          >
            <Add16 class="up-icon" />
          </button>

          <div :class="`${carbonPrefix}--number__rule-divider`" />
        </div>
      </div>

      <div v-if="isInvalid" :class="`${carbonPrefix}--form-requirement`">
        <slot name="invalid-message">{{ invalidMessage }}</slot>
      </div>

      <div v-else-if="isWarn" :class="`${carbonPrefix}--form-requirement`">
        <slot name="warn-text">{{ warnText }}</slot>
      </div>

      <div v-if="isHelper" :class="`${carbonPrefix}--form__helper-text`">
        <slot name="helper-text">{{ helperText }}</slot>
      </div>
    </div>
  </cv-wrapper>
</template>

<script setup>
import { computed, ref, useSlots, nextTick } from 'vue';
import Add16 from '@carbon/icons-vue/es/add/16';
import Subtract16 from '@carbon/icons-vue/es/subtract/16';
import WarningFilled16 from '@carbon/icons-vue/es/warning--filled/16';
import WarningAltFilled16 from '@carbon/icons-vue/es/warning--alt--filled/16';
import { useCvId, props as propsCvId } from '../../use/cvId';
import { props as propsTheme } from '../../use/cvTheme';
import { useCvInputHelpers } from '../../use/cvInput';
import { carbonPrefix } from '../../global/settings';
import CvWrapper from '../CvWrapper/CvWrapper';
import { sizeTypes } from './const';

const props = defineProps({
  disabled: Boolean,
  modelValue: {
    type: [String, Number],
    default: undefined,
  },
  formItem: {
    type: Boolean,
    default: true,
  },
  helperText: {
    type: String,
    default: undefined,
  },
  invalidMessage: {
    type: String,
    default: undefined,
  },
  label: {
    type: String,
    default: '',
  },
  ariaLabelForUpButton: {
    type: String,
    default: 'Increase number input',
  },
  ariaLabelForDownButton: {
    type: String,
    default: 'Decrease number input',
  },
  min: {
    type: [String, Number],
    default: undefined,
  },
  max: {
    type: [String, Number],
    default: undefined,
  },
  step: {
    type: [String, Number],
    default: undefined,
  },
  /** Specify the size of the Text Input. Currently, supports the following:
   `sm`,
   `md`,
   `lg` */
  size: {
    type: String,
    default: undefined,
    validator: value => sizeTypes.has(value),
  },
  warnText: {
    type: String,
    default: undefined,
  },
  ...propsCvId,
  ...propsTheme,
});

const emit = defineEmits(['update:modelValue']);
const cvId = useCvId(props);
const { isInvalid, isWarn, isHelper, isLight } = useCvInputHelpers(props);

const iconClasses = computed(() => {
  const classes = [];
  if (isInvalid.value || isWarn.value) {
    classes.push(`${carbonPrefix}--number__invalid`);
  }
  if (isWarn.value && !isInvalid.value) {
    classes.push(`${carbonPrefix}--number__invalid--warning`);
  }

  return classes.join(' ');
});

const input = ref(null);
const modelValueType = typeof props.modelValue;
const valuesToNaN = ['', null, undefined];

const formatInputValueType = value => {
  if (modelValueType === 'string') return Number(value).toString();
  // According to Vue2 component if there is no value NaN is emitted
  return valuesToNaN.includes(value) ? NaN : Number(value);
};

const displayValue = ref(props.modelValue || props.min);
const internalValue = computed({
  get() {
    return props.modelValue || displayValue.value;
  },
  set(value) {
    displayValue.value = formatInputValueType(value);
    if (Number.isNaN(displayValue.value) || displayValue.value === 'NaN') {
      displayValue.value = 0;
      nextTick(() => (displayValue.value = NaN));
    }
    onInput(displayValue.value);
  },
});

const onInput = value => {
  emit('update:modelValue', value);
};

const programmaticEventsToTrigger = ['input', 'change'];
const onProgrammaticValueChanged = inputRef => {
  programmaticEventsToTrigger.forEach(eventName => {
    const event = new Event(eventName);
    inputRef.value.dispatchEvent(event);
  });
};

const doUp = () => {
  input.value.stepUp();
  onProgrammaticValueChanged(input);
};

const doDown = () => {
  input.value.stepDown();
  onProgrammaticValueChanged(input);
};

const slots = useSlots();
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>
