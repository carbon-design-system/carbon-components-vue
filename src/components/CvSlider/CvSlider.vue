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
      <span :class="`${carbonPrefix}--slider__range-label`">{{
        internalMinLabel
      }}</span>
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
      <span :class="`${carbonPrefix}--slider__range-label`">{{
        internalMaxLabel
      }}</span>
      <input
        type="number"
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
import { computed, ref, onMounted, nextTick } from 'vue';
import { carbonPrefix } from '../../global/settings';
import { props as propsCvId, useCvId } from '../../use/cvId';
import { useIsLight, props as propsTheme } from '../../use/cvTheme';

const props = defineProps({
  value: {
    type: String,
    default: undefined,
  },
  modelValue: {
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

const cvId = useCvId(props, true);
const isLight = useIsLight(props);
const internalValue = ref('');
const animateClick = ref(false);
const isDragging = ref(false);
const dragStartX = ref(0);
const dragStartValue = ref(0);
const percentage = ref('0%');

const range = ref(null);

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

// setValue(newValue) {
//       if (this.disabled) return;

//       this.$refs.range.value = newValue;
//       this.internalValue = this.$refs.range.value;

//       this.percentage = `${((this.internalValue - this.getMin()) * 100) / (this.getMax() - this.getMin())}%`;

//       this.$emit('modelEvent', this.$refs.range.value);
//       this.$emit('change', this.$refs.range.value);
//     },
//     onChange() {
//       let newValue = this.internalValue.length ? parseFloat(this.internalValue) : this.getMin();
//       this.setValue(newValue);
//     },
//     onStartDrag(ev) {
//       document.body.addEventListener('mousemove', this.onDrag);
//       document.body.addEventListener('mouseup', this.onStopDrag);

//       this.dragStartX = ev.clientX;
//       this.dragStartValue = this.getValue();
//       this.isDragging = true;
//     },
//     onDrag(ev) {
//       if (this.isDragging) {
//         // percentage change
//         let newValue = (ev.clientX - this.dragStartX) / this.$refs.track.offsetWidth;
//         // uncapped new value
//         newValue = this.dragStartValue + (this.getMax() - this.getMin()) * newValue;

//         this.setValue(newValue, ev);
//       }
//     },
//     onStopDrag() {
//       this.isDragging = false;
//       document.body.removeEventListener('mousemove', this.onDrag);
//       document.body.removeEventListener('mouseup', this.onStopDrag);
//     },
//     onTrackClick(ev) {
//       const afterAnimate = ev => {
//         if (ev.propertyName === 'left') {
//           this.animateClick = false;
//           this.$refs.thumb.removeEventListener('transitionend', afterAnimate);
//         }
//       };

//       let newValue = ev.offsetX / this.$refs.track.offsetWidth;
//       newValue = (this.getMax() - this.getMin()) * newValue + this.getMin();
//       this.$refs.thumb.addEventListener('transitionend', afterAnimate);
//       this.animateClick = true;

//       this.setValue(newValue, ev);
//     },
//     onUp(ev) {
//       let curValue = ev.target.type === 'number' ? parseFloat(ev.target.value) : this.getValue();
//       let newValue = curValue + (ev.shiftKey ? this.internalMultiplier * this.getStep() : this.getStep());
//       this.setValue(newValue, ev);
//     },
//     onDown(ev) {
//       let curValue = ev.target.type === 'number' ? parseFloat(ev.target.value) : this.getValue();
//       let newValue = curValue - (ev.shiftKey ? this.internalMultiplier * this.getStep() : this.getStep());
//       this.setValue(newValue, ev);
//     },

onMounted(() => {
  range.value.value = props.modelValue;
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
