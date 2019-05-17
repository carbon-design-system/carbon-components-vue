<template>
  <li class="cv-progress-step bx--progress-step" :class="stateClass" :aria-disabled="disabled">
    <svg v-if="isCurrent">
      <path d="M 7, 7 m -7, 0 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0"></path>
    </svg>
    <Warning16 v-else-if="!isComplete && invalid" class="bx--progress__warning" />
    <svg v-else-if="!isComplete">
      <path
        d="M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 13c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"
      ></path>
    </svg>
    <CheckmarkOutline16 v-else-if="isComplete" />

    <cv-tooltip direction="bottom" :tip="label">
      <p class="bx--progress-label">{{ label }}</p>
    </cv-tooltip>

    <p class="bx--progress-optional" v-if="additionalInfo">{{ additionalInfo }}</p>
    <span class="bx--progress-line"></span>
  </li>
</template>

<script>
import CvProgressStepComplete from './_cv-progress-step-complete';
import CvProgressStepIncomplete from './_cv-progress-step-incomplete';
import CvTooltip from '../cv-tooltip/cv-tooltip';
import CvWrapper from '../cv-wrapper/_cv-wrapper';
import CheckmarkOutline16 from '@carbon/icons-vue/es/checkmark--outline/16';
import Warning16 from '@carbon/icons-vue/es/warning/16';

const states = ['incomplete', 'current', 'complete'];

export default {
  name: 'CvProgressStep',
  components: {
    CvProgressStepComplete,
    CvProgressStepIncomplete,
    CvTooltip,
    CvWrapper,
    CheckmarkOutline16,
    Warning16,
  },
  props: {
    additionalInfo: String,
    disabled: Boolean,
    invalid: Boolean,
    label: String,
    complete: Boolean,
  },
  data() {
    return {
      state: -1,
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
    isComplete() {
      return this.state > 0;
    },
    isCurrent() {
      return this.state === 0;
    },
    stateClass() {
      const disabledClass = this.disabled ? ' bx--progress-step--disabled' : '';
      const invalidClass = this.invalid ? ' bx--progress-step--invalid' : '';
      return `bx--progress-step--${states[this.state + 1]}${disabledClass}${invalidClass}`;
    },
  },
};
</script>
