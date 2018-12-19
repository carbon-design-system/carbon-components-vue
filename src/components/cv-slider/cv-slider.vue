<template>
  <div class="cv-slider bx--form-item">
    <label :for="uid" class="bx--label">{{label}}</label>
    <div class="bx--slider-container">
      <span class="bx--slider__range-label">{{minLabelInternal}}</span>
      <div
        class="bx--slider"
        :class="{'bx--slider--disabled': disabled}"
        data-slider
        data-slider-input-box="#slider-input-box"
      >
        <div class="bx--slider__track" @click="onTrackClick" ref="track"></div>
        <div class="bx--slider__filled-track" :style="`width: ${percentage};`"></div>
        <div
          class="bx--slider__thumb"
          :class="{
            'bx--slider__thumb--clicked': animateClick,
           }"
          tabindex="0"
          :style="`left: ${percentage};`"
          ref="thumb"
          @keydown.up.right.prevent="onUp"
          @keydown.down.left.prevent="onDown"
          @mousedown="onStartDrag"
        ></div>
        <input
          :id="uid"
          class="bx--slider__input"
          type="range"
          :step="step"
          :min="min"
          :max="max"
          ref="range"
        >
      </div>
      <span class="bx--slider__range-label">{{maxLabelInternal}}</span>
      <input
        type="number"
        class="bx--text-input bx--slider-text-input"
        :class="{'bx--text-input--light': theme === 'light'}"
        :placeholder="min"
        v-model="internalValue"
        @change="onChange"
        ref="inputBox"
        @keydown.up.prevent="onUp"
        @keydown.down.prevent="onDown"
        :disabled="disabled"
      >
    </div>
  </div>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import themeMixin from '../../mixins/theme-mixin';

const notSupplied = Symbol('slider - no model value'); // a unique identifier

export default {
  name: 'CvSlider',
  mixins: [uidMixin, themeMixin],
  props: {
    disabled: Boolean,
    label: String,
    // NOTE: It is not safe to rely on Numbers for non-integer steps
    min: { type: String, default: '0' },
    max: { type: String, default: '100' },
    step: { type: String, default: '1' },
    stepMultiplier: {
      type: String,
      default: '4',
      validator(val) {
        return parseInt(val) >= 1;
      },
    },
    value: String,
    minLabel: { type: [String, Symbol], default: notSupplied },
    maxLabel: { type: [String, Symbol], default: notSupplied },
  },
  model: {
    prop: 'value',
    event: 'modelEvent',
  },
  data() {
    return {
      internalValue: '',
      animateClick: false,
      isDragging: false,
      dragStartX: 0,
      dragStartValue: 0,
      percentage: '0%',
    };
  },
  computed: {
    minLabelInternal() {
      return this.minLabel !== notSupplied ? this.minLabel : this.min;
    },
    maxLabelInternal() {
      return this.maxLabel !== notSupplied ? this.maxLabel : this.max;
    },
    multiplier() {
      return isNaN(this.stepMltiplier) ? 0 : this.stepMultiplier;
    },
  },
  mounted() {
    this.$refs.range.value = this.value;
    this.internalValue = this.$refs.range.value;
    this.percentage = `${((this.internalValue - this.getMin()) * 100) /
      (this.getMax() - this.getMin())}%`;
  },
  watch: {
    value(val) {
      this.setValue(val);
    },
  },
  methods: {
    // NOTE: It is not safe to rely on Numbers for non-integer steps
    getMin() {
      if (this.$refs.range) {
        const val = parseFloat(this.$refs.range.min);
        return isNaN(val) ? 0 : val;
      }
      return 0;
    },
    getMax() {
      if (this.$refs.range) {
        const val = parseFloat(this.$refs.range.max);
        return isNaN(val) ? 0 : val;
      }
      return 100;
    },
    getValue() {
      if (this.$refs.range) {
        const val = parseFloat(this.$refs.range.value);
        return isNaN(val) ? 0 : val;
      }
      return (this.getMax() + this.getMin()) / 2;
    },
    getStep() {
      if (this.$refs.range) {
        const val = parseFloat(this.$refs.range.step);
        return isNaN(val) ? 0 : val;
      }
      return 1;
    },

    setValue(newValue) {
      if (this.disabled) return;

      this.$refs.range.value = newValue;
      this.internalValue = this.$refs.range.value;

      this.percentage = `${((this.internalValue - this.getMin()) * 100) /
        (this.getMax() - this.getMin())}%`;

      this.$emit('modelEvent', this.$refs.range.value);
      this.$emit('change', this.$refs.range.value);
    },
    onChange(ev) {
      let newValue = this.internalValue.length
        ? parseFloat(this.internalValue)
        : this.getMin();
      this.setValue(newValue);
    },
    onStartDrag(ev) {
      document.body.addEventListener('mousemove', this.onDrag);
      document.body.addEventListener('mouseup', this.onStopDrag);

      this.dragStartX = ev.clientX;
      this.dragStartValue = this.getValue();
      this.isDragging = true;
    },
    onDrag(ev) {
      if (this.isDragging) {
        // percentage change
        let newValue =
          (ev.clientX - this.dragStartX) / this.$refs.track.offsetWidth;
        // uncapped new value
        newValue =
          this.dragStartValue + (this.getMax() - this.getMin()) * newValue;

        this.setValue(newValue, ev);
      }
    },
    onStopDrag(ev) {
      this.isDragging = false;
      document.body.removeEventListener('mousemove', this.onDrag);
      document.body.removeEventListener('mouseup', this.onStopDrag);
    },
    onTrackClick(ev) {
      const afterAnimate = ev => {
        if (ev.propertyName === 'left') {
          this.animateClick = false;
          this.$refs.thumb.removeEventListener('transitionend', afterAnimate);
        }
      };

      let newValue = ev.offsetX / this.$refs.track.offsetWidth;
      newValue = (this.getMax() - this.getMin()) * newValue + this.getMin();
      this.$refs.thumb.addEventListener('transitionend', afterAnimate);
      this.animateClick = true;

      this.setValue(newValue, ev);
    },
    onUp(ev) {
      let curValue =
        ev.target.type === 'number'
          ? parseFloat(ev.target.value)
          : this.getValue();
      let newValue =
        curValue +
        (ev.shiftKey
          ? parseFloat(this.stepMultiplier) * this.getStep()
          : this.getStep());
      this.setValue(newValue, ev);
    },
    onDown(ev) {
      let curValue =
        ev.target.type === 'number'
          ? parseFloat(ev.target.value)
          : this.getValue();
      let newValue =
        curValue -
        (ev.shiftKey
          ? parseFloat(this.stepMultiplier) * this.getStep()
          : this.getStep());
      this.setValue(newValue, ev);
    },
  },
};
</script>

<style lang="sass">
</style>
