<template>
  <div :data-date-picker="['single', 'range'].includes(kind)"
    :data-date-picker-type="kind"
    class="cv-date-picker bx--date-picker"
    :class="[kindClass, {'bx--date-picker--light': theme==='light'}]" ref="date-picker">
    <div :class="{'bx--date-picker-container': ['single', 'range'].includes(kind)}" @change="onSimpleChange">
      <svg v-if="kind === 'single'" data-date-picker-icon class="bx--date-picker__icon"
        width="14" height="16" viewBox="0 0 14 16">
        <path d="M0 5h14v1H0V5zm3-5h1v4H3V0zm7 0h1v4h-1V0zM0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 0 14.5v-12zm1 0v12a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5z"
          fill-rule="nonzero" />
      </svg>
      <label :for="`${uid}-input-1`" class="bx--label">{{dateLabelValue}}</label>
      <input :data-invalid="invalid" type="text" :id="`${uid}-input-1`"
        class="bx--date-picker__input"  :pattern="pattern" :placeholder="placeholder"
        data-date-picker-input :data-date-picker-input-from="kind === 'range'"/>
      <div class="bx--form-requirement" v-if="invalid">
        {{invalidDateMessage}}
      </div>
    </div>
    <div :class="{'bx--date-picker-container': kind === 'range'}" v-if="kind === 'range'">
      <label :for="`${uid}-input-2`" class="bx--label">{{dateEndLabelValue}}</label>
      <input type="text" :id="`${uid}-input-2`"
        class="bx--date-picker__input" :pattern="pattern" :placeholder="placeholder"
        data-date-picker-input :data-date-picker-input-to="kind === 'range'"/>
    </div>
    <svg v-if="kind === 'range'" data-date-picker-icon class="bx--date-picker__icon"
      width="14" height="16" viewBox="0 0 14 16">
      <path d="M0 5h14v1H0V5zm3-5h1v4H3V0zm7 0h1v4h-1V0zM0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 0 14.5v-12zm1 0v12a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5z"
        fill-rule="nonzero" />
    </svg>
  </div>
</template>

<script>
import { DatePicker } from 'carbon-components';
import uidMixin from '../../mixins/uid-mixin';
import themeMixin from '../../mixins/theme-mixin';

export default {
  name: 'CvDatePicker',
  mixins: [uidMixin, themeMixin],
  props: {
    dateLabel: String,
    dateEndLabel: String,
    kind: {
      type: String,
      default: 'simple',
      validator: val => ['short', 'simple', 'single', 'range'].includes(val),
    },
    flatpickrOptions: {
      type: Object,
      default: () => {
        return {
          dateFormat: 'm/d/Y',
        };
      },
    },
    pattern: { type: String, default: '\\d{1,2}/\\d{1,2}/\\d{4}' },
    placeholder: { type: String, default: 'mm/dd/yyyy' },
    invalid: Boolean,
    invalidDateMessage: { type: String, default: 'Invalid date format' },
  },
  data() {
    return {
      carbonComponent: null,
    };
  },
  computed: {
    kindClass() {
      if (this.kind === 'short') {
        return 'bx--date-picker--short bx--date-picker--simple';
      }
      return `bx--date-picker--${this.kind}`;
    },
    dateLabelValue() {
      if (this.dateLabel && this.dateLabel.length) {
        return this.dateLabel;
      } else {
        if (this.kind === 'range') {
          return 'Start date';
        } else {
          return 'Date';
        }
      }
    },
    dateEndLabelValue() {
      if (this.dateEndLabel && this.dateEndLabel.length) {
        return this.dateEndLabel;
      } else {
        if (this.kind === 'range') {
          return 'End date';
        } else {
          return '';
        }
      }
    },
  },
  methods: {
    onChange(ev) {
      this.$emit('onChange', ev);
    },
    onSimpleChange(ev) {
      if (!['single', 'range'].includes(this.kind)) {
        this.$emit('onSimpleChange', ev);
      }
    },
    getOptions() {
      const _options = { ...this.flatpickrOptions };

      // add events update based on parameters
      _options.onChange = this.onChange;
      _options.onValueUpdate = this.onChange;

      return _options;
    },
  },
  mounted() {
    if (['single', 'range'].includes(this.kind)) {
      this.carbonComponent = DatePicker.create(
        this.$refs['date-picker'],
        this.getOptions()
      );
    }
  },
  beforeDestroy() {
    if (this.carbonComponent) {
      this.carbonComponent.release();
    }
  },
};
</script>

<style lang="scss">
// Import Style Definitions
@import '~carbon-components/scss/components/date-picker/date-picker';

.cv-date-picker {
  display: inline-flex; // otherwise 100% width
}
</style>
