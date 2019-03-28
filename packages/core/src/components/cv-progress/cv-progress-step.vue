<template>
  <li
    class="cv-progress-step bx--progress-step"
    :class="[stateClass, { 'bx--progress-step--disabled': $attrs.disabled }]"
  >
    <cv-wrapper v-if="componentsX">
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
    </cv-wrapper>
    <cv-wrapper v-else>
      <cv-progress-step-complete v-if="isComplete" />
      <cv-progress-step-incomplete v-if="!isComplete" :is-current="isCurrent" />
    </cv-wrapper>
    <cv-tooltip v-show="componentsX" direction="bottom" :tip="label">
      <p class="bx--progress-label">{{ label }}</p>
    </cv-tooltip>
    <p v-if="!componentsX" class="bx--progress-label">{{ label }}</p>

    <p class="bx--progress-optional" v-if="componentsX && additionalInfo">{{ additionalInfo }}</p>
    <span class="bx--progress-line"></span>
  </li>
</template>

<script>
import CvProgressStepComplete from './_cv-progress-step-complete';
import CvProgressStepIncomplete from './_cv-progress-step-incomplete';
import { componentsX } from '../../internal/feature-flags';
import CvTooltip from '../cv-tooltip/cv-tooltip';
import CvWrapper from '../cv-wrapper/_cv-wrapper';
import CheckmarkOutline16 from '@carbon/icons-vue/lib/checkmark--outline/16';
import Warning16 from '@carbon/icons-vue/lib/warning/16';

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
    invalid: Boolean,
    label: String,
    complete: Boolean,
  },
  data() {
    return {
      componentsX,
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
      return `bx--progress-step--${states[this.state + 1]}`;
    },
  },
};
</script>
