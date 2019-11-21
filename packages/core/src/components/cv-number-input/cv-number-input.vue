<template>
  <cv-wrapper :tag-type="formItem ? 'div' : ''" class="cv-number-input bx--form-item">
    <div
      data-numberinput
      class="bx--number"
      :class="{
        'bx--number--light': theme === 'light',
        'bx--number--helpertext': isHelper,
        'cv-number-input': !formItem,
      }"
      :data-invalid="isInvalid"
    >
      <label :for="uid" class="bx--label">{{ label }}</label>
      <div class="bx--form__helper-text" v-if="isHelper">
        <slot name="helper-text">{{ helperText }}</slot>
      </div>
      <div class="bx--number__input-wrapper">
        <input
          :id="uid"
          type="number"
          v-model="internalValue"
          v-bind="$attrs"
          v-on="inputListeners"
          :step="step"
          :min="min"
          :max="max"
        />
        <WarningFilled16 v-if="isInvalid" class="bx--number__invalid" />
        <div class="bx--number__controls">
          <button
            class="bx--number__control-btn up-icon"
            @click="doUp"
            type="button"
            :aria-label="ariaLabelForUpButton"
          >
            <CaretUpGlyph />
          </button>
          <button
            class="bx--number__control-btn down-icon"
            @click="doDown"
            type="button"
            :aria-label="ariaLabelForDownButton"
          >
            <CaretDownGlyph />
          </button>
        </div>
      </div>
      <div class="bx--form-requirement" v-if="isInvalid">
        <slot name="invalid-message">{{ invalidMessage }}</slot>
      </div>
    </div>
  </cv-wrapper>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import themeMixin from '../../mixins/theme-mixin';
import CaretDownGlyph from '@carbon/icons-vue/es/caret--down/index';
import CaretUpGlyph from '@carbon/icons-vue/es/caret--up/index';
import WarningFilled16 from '@carbon/icons-vue/es/warning--filled/16';
import CvWrapper from '../cv-wrapper/_cv-wrapper';

const maxDecimalPlaces = 10; // Stanard floating point accuracy goes at 14 cautionsly

export default {
  name: 'CvNumberInput',
  mixins: [uidMixin, themeMixin],
  components: { CaretDownGlyph, CaretUpGlyph, WarningFilled16, CvWrapper },
  inheritAttrs: false,
  props: {
    formItem: { type: Boolean, default: true },
    helperText: { type: String, default: undefined },
    invalidMessage: { type: String, default: undefined },
    label: { type: String, default: '' },
    value: { type: [String, Number], default: '' },
    invalid: /* deprecate */ {
      type: Boolean,
      default: undefined,
      validator(val) {
        if (val !== undefined && process.env.NODE_ENV === 'development') {
          console.warn('CvNumberInput: invalid prop deprecated in favour of invalidMessage');
        }
        return true;
      },
    },
    ariaLabelForUpButton: { type: String, default: 'Increase number input' },
    ariaLabelForDownButton: { type: String, default: 'Decrease number input' },
    min: { type: [String, Number], default: undefined },
    max: { type: [String, Number], default: undefined },
    step: { type: [String, Number], default: undefined },
  },
  data() {
    return {
      internalValue: 0,
      isHelper: false,
      isInvalid: false,
    };
  },
  mounted() {
    this.internalValue = this.valueAsString(this.value);
    this.checkSlots();
  },
  beforeUpdate() {
    this.checkSlots();
  },
  watch: {
    value() {
      this.internalValue = this.valueAsString(this.value);
    },
  },
  computed: {
    // Bind listeners at the component level to the embedded input element and
    // add our own input listener to service the v-model. See:
    // https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model
    inputListeners() {
      return Object.assign({}, this.$listeners, {
        input: () => this.emitValue(),
      });
    },
    internalNumberValue() {
      let numVal = parseFloat(this.internalValue, 10);

      if (isNaN(numVal)) {
        numVal = parseFloat(this.min, 10) || 0;
      }
      return this.roundToPrecision(numVal);
    },
    internalMinValue() {
      let numVal = parseFloat(this.min, 10);

      if (isNaN(numVal)) {
        return undefined;
      }
      return this.roundToPrecision(numVal);
    },
    internalMaxValue() {
      let numVal = parseFloat(this.max, 10);

      if (isNaN(numVal)) {
        return undefined;
      }
      return this.roundToPrecision((this.internalStepValue * numVal) / this.internalStepValue);
    },
    internalStepValue() {
      let numVal = parseFloat(this.step, 10);

      if (isNaN(numVal) || numVal <= 0) {
        numVal = 1;
      }
      return numVal;
    },
    stepDecimalPlaces() {
      if (Math.floor(this.internalStepValue) === this.internalStepValue) return 0;
      return Math.min(maxDecimalPlaces, this.internalStepValue.toString().split('.')[1].length || 0);
    },
    // stepPrecision() {
    //   return Math.pow(10, -1 * this.stepDecimalPlaces);
    // },
  },
  methods: {
    checkSlots() {
      // NOTE: this.$slots is not reactive so needs to be managed on beforeUpdate
      this.isInvalid = !!(this.$slots['invalid-message'] || (this.invalidMessage && this.invalidMessage.length));
      this.isHelper = !!(this.$slots['helper-text'] || (this.helperText && this.helperText.length));
    },
    _doUpDown(up) {
      let value;
      let min = this.internalMinValue;
      let min0 = min || 0;
      let max = this.internalMaxValue;
      let step = this.internalStepValue;
      // be wary of floating point error
      // steps should be from min value to less than or equal to max
      let steps = Math.round((this.internalNumberValue - min0) / step);

      if (up) {
        value = this.roundToPrecision(min0 + step * (steps + 1));

        if (max !== undefined && value > max) {
          steps = Math.round((max - min0) / step);
          value = min0 + step * steps;
          if (value > max) {
            value = value - step;
          }
          value = this.roundToPrecision(value);
        }

        if (this.roundToPrecision(value - this.internalNumberValue - step, maxDecimalPlaces) > 0) {
          // this is simpler than trying to prevent rounding errors
          value = value - step;
        }

        this.internalValue = this.valueAsString(value);
      } else {
        value = this.roundToPrecision(min0 + step * (steps - 1));

        if (min !== undefined && value < min) {
          value = min;
        }

        if (this.roundToPrecision(value - this.internalNumberValue + step, maxDecimalPlaces) < 0) {
          // this is simpler than trying to prevent rounding errors
          value = value + step;
        }

        this.internalValue = this.valueAsString(value);
      }
      this.emitValue();
    },
    doUp() {
      this._doUpDown(true);
    },
    doDown() {
      this._doUpDown(false);
    },
    emitValue() {
      if (typeof this.value === 'number') {
        this.$emit('input', this.internalNumberValue);
      } else {
        this.$emit('input', this.internalValue);
      }
    },
    valueAsString(val) {
      let strVal;
      if (typeof val === 'number') {
        strVal = val.toFixed(this.stepDecimalPlaces);
      } else {
        strVal = val;
      }

      return strVal;
    },
    roundToPrecision(x, optDecimalPlaces) {
      // let sign = x >= 0 ? 1 : -1;
      // let y = x + sign * (this.stepPrecision === undefined ? 0.5 : this.stepPrecision / 2);
      // return y - (y % (this.stepPrecision === undefined ? 1 : this.stepPrecision));
      let decimalPlaces = optDecimalPlaces || this.stepDecimalPlaces;
      return parseFloat(x.toFixed(decimalPlaces));
    },
  },
};
</script>
