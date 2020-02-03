<template>
  <cv-wrapper :tag-type="formItem ? 'div' : ''" class="cv-number-input bx--form-item">
    <div
      data-numberinput
      class="bx--number"
      :class="{
        'bx--number--light': theme === 'light',
        'bx--number--helpertext': isHelper,
        'cv-number-input': !formItem,
        'bx--number--mobile': mobile,
      }"
      :data-invalid="isInvalid"
    >
      <label :for="uid" class="bx--label">{{ label }}</label>
      <div class="bx--form__helper-text" v-if="isHelper">
        <slot name="helper-text">{{ helperText }}</slot>
      </div>
      <div class="bx--number__input-wrapper">
        <button
          v-if="mobile"
          class="bx--number__control-btn down-icon"
          @click="doDown"
          type="button"
          :aria-label="ariaLabelForDownButton"
          :disabled="disabled"
        >
          <CaretDownGlyph />
        </button>
        <input
          :id="uid"
          type="number"
          :value="internalValue"
          v-bind="$attrs"
          v-on="inputListeners"
          :disabled="disabled"
          :step="step"
          :min="min"
          :max="max"
          ref="input"
        />
        <WarningFilled16 v-if="isInvalid && !mobile" class="bx--number__invalid" />
        <div class="bx--number__controls" v-if="!mobile">
          <button
            class="bx--number__control-btn up-icon"
            @click="doUp"
            type="button"
            :aria-label="ariaLabelForUpButton"
            :disabled="disabled"
          >
            <CaretUpGlyph />
          </button>
          <button
            class="bx--number__control-btn down-icon"
            @click="doDown"
            type="button"
            :aria-label="ariaLabelForDownButton"
            :disabled="disabled"
          >
            <CaretDownGlyph />
          </button>
        </div>
        <button
          v-else
          class="bx--number__control-btn up-icon"
          @click="doUp"
          type="button"
          :aria-label="ariaLabelForUpButton"
          :disabled="disabled"
        >
          <CaretUpGlyph />
        </button>
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

export default {
  name: 'CvNumberInput',
  mixins: [uidMixin, themeMixin],
  components: { CaretDownGlyph, CaretUpGlyph, WarningFilled16, CvWrapper },
  inheritAttrs: false,
  props: {
    disabled: Boolean,
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
    mobile: Boolean,
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
      // NOTE: DELIBERATE USE OF != TO COMPARE this.interanlValue and this.value
      if (typeof this.value !== 'number' || this.internalValue != this.value) {
        // prevents this.value of 1 updating this.internalValue of 1.0
        // which improves the typing experience
        // does not matter if this.value is string or number
        this.internalValue = this.valueAsString(this.value);
      }
    },
  },
  computed: {
    // Bind listeners at the component level to the embedded input element and
    // add our own input listener to service the v-model. See:
    // https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model
    inputListeners() {
      return Object.assign({}, this.$listeners, {
        input: ev => this.onInput(ev.target.value),
      });
    },
  },
  methods: {
    onInput(val) {
      this.internalValue = val;
      this.emitValue();
    },
    checkSlots() {
      // NOTE: this.$slots is not reactive so needs to be managed on beforeUpdate
      this.isInvalid = !!(this.$slots['invalid-message'] || (this.invalidMessage && this.invalidMessage.length));
      this.isHelper = !!(this.$slots['helper-text'] || (this.helperText && this.helperText.length));
    },
    doUp() {
      this.$refs.input.stepUp();
      this.onInput(this.$refs.input.value);
    },
    doDown() {
      this.$refs.input.stepDown();
      this.onInput(this.$refs.input.value);
    },
    emitValue() {
      if (typeof this.value === 'number') {
        if (this.internalValue != this.value) {
          const ePos = this.internalValue.indexOf('e-');
          const dotPos = this.internalValue.indexOf('.');
          if (ePos > -1 || dotPos > -1) {
            this.$emit('input', parseFloat(this.internalValue));
          } else {
            this.$emit('input', parseInt(this.internalValue));
          }
        }
      } else {
        this.$emit('input', this.internalValue);
      }
    },
    valueAsString(val) {
      let strVal;
      if (typeof val === 'number') {
        strVal = Number.isFinite(val) ? val.toString() : '';
      } else {
        strVal = val;
      }
      return strVal;
    },
  },
};
</script>
