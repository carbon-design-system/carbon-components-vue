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
          [`cv-number-input`]: !formItem,
        },
      ]"
      :data-invalid="dataInvalidAttributeValue"
    >
      <label v-show="label" :for="cvId" :class="`${carbonPrefix}--label`">
        {{ label }}
      </label>

      <div
        :class="[
          `${carbonPrefix}--number__input-wrapper`,
          { [`${carbonPrefix}--number__input-wrapper--warning`]: isWarn },
        ]"
      >
        <input
          ref="input"
          v-model.number="internalValue"
          :id="cvId"
          :data-invalid="dataInvalidAttributeValue"
          type="number"
          v-bind="$attrs"
          :disabled="disabled"
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
            :disabled="disabled"
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
            :disabled="disabled"
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

      <div
        v-if="isWarn && !isInvalid"
        :class="`${carbonPrefix}--form-requirement`"
      >
        <slot name="warn-text">{{ warnText }}</slot>
      </div>

      <div
        v-if="!(isInvalid || isWarn) && isHelper"
        :class="`${carbonPrefix}--form__helper-text`"
      >
        <slot name="helper-text">{{ helperText }}</slot>
      </div>
    </div>
  </cv-wrapper>
</template>

<script setup>
import { computed, ref } from 'vue';
import Add16 from '@carbon/icons-vue/es/add/16';
import Subtract16 from '@carbon/icons-vue/es/subtract/16';
import WarningFilled16 from '@carbon/icons-vue/es/warning--filled/16';
import WarningAltFilled16 from '@carbon/icons-vue/es/warning--alt--filled/16';
import { useCvId, props as propsCvId } from '../../use/cvId';
import { props as propsTheme } from '../../use/cvTheme';
import { useCvInputHelpers } from '../../use/cvInput';
import { carbonPrefix } from '../../global/settings';
import CvWrapper from '../CvWrapper/CvWrapper';

const props = defineProps({
  disabled: Boolean,
  modelValue: {
    type: [String, Number],
    default: '',
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
  warnText: {
    type: String,
    default: undefined,
  },
  ...propsCvId,
  ...propsTheme,
});

const cvId = useCvId(props);
const { isInvalid, isWarn, isHelper, isLight } = useCvInputHelpers(props);
const dataInvalidAttributeValue = computed(() =>
  isInvalid ? undefined : true
);

const iconClasses = computed(() => {
  const classes = [];

  if (isInvalid || isWarn) {
    classes.push(`${carbonPrefix}--number__invalid`);
  }

  if (isWarn && !isInvalid) {
    classes.push(`${carbonPrefix}--number__invalid--warning`);
  }

  return classes.join(' ');
});

const emit = defineEmits(['update:modelValue']);
const input = ref(null);
const internalValue = computed({
  get() {
    const { modelValue } = props;
    if (typeof modelValue === 'number') return modelValue;
    const valueAsNumber = Number(modelValue);
    return Number.isNaN(valueAsNumber) ? '' : valueAsNumber;
  },
  set(value) {
    onInput(value);
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
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>
