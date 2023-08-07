<template>
  <div :class="`cv-slider ${carbonPrefix}--form-item`">
    <label
      v-show="label"
      :for="cvId"
      :class="[
        `${carbonPrefix}--label`,
        { [`${carbonPrefix}--label--disabled`]: disabled },
      ]"
      :id="labelId"
    >
      {{ label }}
    </label>

    <div :class="`${carbonPrefix}--slider-container`">
      <span :class="`${carbonPrefix}--slider__range-label`">
        {{ internalMinLabel }}
      </span>

      <div
        :class="[
          `${carbonPrefix}--slider`,
          { [`${carbonPrefix}--slider--disabled`]: disabled },
        ]"
        data-slider
        data-slider-input-box="#slider-input-box"
      >
        <div
          :class="`${carbonPrefix}--slider__track`"
          @click="onTrackClick"
          ref="track"
        ></div>

        <div
          :class="`${carbonPrefix}--slider__filled-track`"
          :style="`width: ${percentage};`"
        ></div>

        <div
          :class="[
            `${carbonPrefix}--slider__thumb`,
            {
              [`${carbonPrefix}--slider__thumb--clicked`]: animateClick,
            },
          ]"
          tabindex="0"
          :aria-labelledby="labelId"
          :style="`left: ${percentage};`"
          ref="thumb"
          @keydown.up.right.prevent="onUp"
          @keydown.down.left.prevent="onDown"
          @mousedown="onStartDrag"
        ></div>

        <input
          :id="cvId"
          :class="`${carbonPrefix}--slider__input`"
          type="range"
          :step="step"
          :min="min"
          :max="max"
          ref="range"
        />
      </div>

      <span :class="`${carbonPrefix}--slider__range-label`">
        {{ internalMaxLabel }}
      </span>

      <input
        type="string"
        :class="[
          `${carbonPrefix}--text-input ${carbonPrefix}--slider-text-input`,
          { [`${carbonPrefix}--text-input--light`]: isLight },
        ]"
        :placeholder="min"
        v-model="internalValue"
        @change="onChange"
        ref="inputBox"
        @keydown.up.prevent="onUp"
        @keydown.down.prevent="onDown"
        :disabled="disabled"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, nextTick, watch } from 'vue';
import { carbonPrefix } from '../../global/settings';
import { props as propsCvId, useCvId } from '../../use/cvId';
import { useIsLight, props as propsTheme } from '../../use/cvTheme';

const props = defineProps({
  modelValue: {
    type: String,
    default: undefined,
  },
  value: {
    type: String,
    default: undefined,
  },
  disabled: Boolean,
  label: {
    type: String,
    default: undefined,
  },
  // NOTE: It is not safe to rely on Numbers for non-integer steps
  min: {
    type: String,
    default: '0',
  },
  max: {
    type: String,
    default: '100',
  },
  minLabel: {
    type: String,
    default: undefined,
  },
  maxLabel: {
    type: String,
    default: undefined,
  },
  step: {
    type: String,
    default: '1',
  },
  stepMultiplier: {
    type: String,
    default: '4',
    validator(val) {
      if (val.length) {
        let intMultiplier = parseInt(val);
        if (isNaN(intMultiplier) || intMultiplier < 1) {
          console.warn('cv-slider: multiplier must be >= 1');
          return false;
        }
      }
      return true;
    },
  },
  ...propsTheme,
  ...propsCvId,
});

const DefaultRangeMin = 0;
const DefaultRangeMax = 100;
const MiddleValue = (getMax() + getMin()) / 2;
const DefaultValue = 0;
const StepNaNReplacement = 0;
const StepDefaultValue = 1;
const DefaultMultiplier = 4;

const emit = defineEmits(['update:modelValue', 'change', 'update:value']);

const cvId = useCvId(props, true);
const isLight = useIsLight(props);
const internalValue = ref('');
const animateClick = ref(false);
const isDragging = ref(false);
const dragStartX = ref(0);
const dragStartValue = ref(0);
const percentage = ref('0%');

const range = ref(null);
const thumb = ref(null);
const track = ref(null);

const labelId = computed(() => `${cvId.value}-label`);

const internalMinLabel = computed(() => props.minLabel ?? getMin());

const internalMaxLabel = computed(() => props.maxLabel ?? getMax());

const rangePropsObserver = computed(() => ({
  min: props.min,
  max: props.max,
  step: props.step,
}));

const internalMultiplier = computed(() => {
  let intMultiplier = parseInt(stepMultiplier);
  // default to 4 fro multiplier
  return isNaN(intMultiplier) ? DefaultMultiplier : Math.max(intMultiplier, 1);
});

function getRangeAttributeValue(
  attributeName,
  defaultForNaN,
  defaultReturnValue
) {
  if (range?.value) {
    const val = parseFloat(range.value[attributeName]);
    return isNaN(val) ? defaultForNaN : val;
  }
  return defaultReturnValue ?? defaultForNaN;
}

function getMin() {
  return getRangeAttributeValue('min', DefaultRangeMin);
}

function getMax() {
  return getRangeAttributeValue('max', DefaultRangeMax);
}

function getValue() {
  return getRangeAttributeValue('value', DefaultValue, MiddleValue);
}

function getStep() {
  return getRangeAttributeValue('step', StepNaNReplacement, StepDefaultValue);
}

function setValue(newValue) {
  if (props.disabled) return;

  range.value.value = newValue;
  internalValue.value = range.value.value;

  percentage.value = `${
    ((internalValue.value - getMin()) * 100) / (getMax() - getMin())
  }%`;

  const { value: rangeValue } = range.value;
  emit('update:modelValue', rangeValue);
  emit('update:value', rangeValue);
  emit('change', rangeValue);
}

function onChange() {
  let newValue = internalValue.value.length
    ? parseFloat(internalValue.value)
    : getMin();
  setValue(newValue);
}

function onStartDrag(ev) {
  document.body.addEventListener('mousemove', onDrag);
  document.body.addEventListener('mouseup', onStopDrag);

  dragStartX.value = ev.clientX;
  dragStartValue.value = getValue();
  isDragging.value = true;
}

function onDrag(ev) {
  if (isDragging.value) {
    // percentage change
    let newValue = (ev.clientX - dragStartX.value) / track.value.offsetWidth;
    // uncapped new value
    newValue = dragStartValue.value + (getMax() - getMin()) * newValue;
    setValue(newValue);
  }
}

function onStopDrag() {
  isDragging.value = false;
  document.body.removeEventListener('mousemove', onDrag);
  document.body.removeEventListener('mouseup', onStopDrag);
}

function onTrackClick(ev) {
  const afterAnimate = ev => {
    if (ev.propertyName === 'left') {
      animateClick.value = false;
      thumb.value.removeEventListener('transitionend', afterAnimate);
    }
  };

  let newValue = ev.offsetX / track.value.offsetWidth;
  const min = getMin();
  newValue = (getMax() - min) * newValue + min;
  thumb.value.addEventListener('transitionend', afterAnimate);
  animateClick.value = true;
  setValue(newValue);
}

function onUpDown(ev, isUp = true) {
  let curValue =
    ev.target.type === 'number' ? parseFloat(ev.target.value) : getValue();
  const step = getStep();
  const progressValue = ev.shiftKey ? internalMultiplier.value * step : step;
  const direction = isUp ? 1 : -1;
  let newValue = curValue + progressValue * direction;
  setValue(newValue);
}

function onUp(ev) {
  onUpDown(ev);
}

function onDown(ev) {
  onUpDown(ev, false);
}

onMounted(() => {
  range.value.value = props.value;
  internalValue.value = range.value.value;
  percentage.value = `${
    ((internalValue.value - getMin()) * 100) / (getMax() - getMin())
  }%`;
});

watch(
  () => props.modelValue,
  modelValue => {
    setValue(modelValue);
  }
);

watch(
  () => props.value,
  value => {
    setValue(value);
  }
);

watch(rangePropsObserver, () => {
  nextTick(() => {
    setValue(internalValue.value);
  });
});
</script>
