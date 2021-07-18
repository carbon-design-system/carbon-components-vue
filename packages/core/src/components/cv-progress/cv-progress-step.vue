<template>
  <li
    :class="[
      `cv-progress-step ${carbonPrefix}--progress-step`,
      `${carbonPrefix}--progress-step--${stateString}`,
      {
        [`${carbonPrefix}--progress-step--disabled`]: disabled,
        [`${carbonPrefix}--progress-step--invalid`]: invalid,
      },
    ]"
    :aria-disabled="disabled"
  >
    <conponent :is="stepIcon" :class="stepClass">
      <title>{{ description }}</title>
    </conponent>

    <p
      :class="[`${carbonPrefix}--progress-label`, { [`${carbonPrefix}--progress-label-overflow`]: showOverflow }]"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @click="$emit('step-clicked', $event)"
      ref="label"
    >
      {{ label }}
    </p>

    <div role="tooltip" data-floating-menu-direction="bottom" :class="`${carbonPrefix}--tooltip`">
      <span :class="`${carbonPrefix}--tooltip__caret`"></span>
      <p :class="`${carbonPrefix}--tooltip__text`">{{ tip }}</p>
    </div>

    <p :class="`${carbonPrefix}--progress-optional`" v-if="additionalInfo">{{ additionalInfo }}</p>
    <span :class="`${carbonPrefix}--progress-line`"></span>
  </li>
</template>

<script>
import { CircleFilled16, CheckmarkOutline16, Warning16, RadioButton16 } from '@carbon/icons-vue';
import { carbonPrefixMixin } from '../../mixins';

const states = ['incomplete', 'current', 'complete'];

export default {
  name: 'CvProgressStep',
  mixins: [carbonPrefixMixin],
  components: {
    CheckmarkOutline16,
    CircleFilled16,
    RadioButton16,
    Warning16,
  },
  props: {
    additionalInfo: String,
    description: String,
    disabled: Boolean,
    invalid: Boolean,
    label: String,
    tipText: String,
    complete: Boolean,
  },
  data() {
    return {
      state: -1,
      showOverflow: false,
      tip: '',
    };
  },
  mounted() {
    this.$_CvProgressStep = true; // for use by parent with $children
    this.$parent.$emit('cv:mounted');
  },
  beforeDestroy() {
    this.$parent.$emit('cv:beforeDestroy');
  },
  watch: {
    complete() {
      this.$parent.$emit('cv:completed');
    },
  },
  computed: {
    internalState: {
      get() {
        return this.state;
      },
      set(val) {
        this.state = Math.sign(val);
      },
    },
    stateString() {
      return states[this.state + 1];
    },
    isComplete() {
      return this.state > 0;
    },
    isCurrent() {
      return this.state === 0;
    },
    stepClass() {
      return this.invalid ? `${this.carbonPrefix}--progress__warning` : '';
    },
    stepIcon() {
      if (this.invalid) {
        return Warning16;
      } else {
        if (this.isCurrent) {
          return CircleFilled16;
        } else if (this.isComplete) {
          return CheckmarkOutline16;
        } else {
          return RadioButton16;
        }
      }
    },
  },
  methods: {
    onMouseEnter() {
      if (this.tipText) {
        this.tip = this.tipText;
        this.showOverflow = true;
      } else {
        if (this.$refs.label.scrollWidth > this.$refs.label.clientWidth) {
          this.tip = this.label;
          this.showOverflow = true;
        } else {
          this.tip = '';
          this.showOverflow = false;
        }
      }
    },
    onMouseLeave() {
      this.showOverflow = false;
    },
  },
};
</script>
