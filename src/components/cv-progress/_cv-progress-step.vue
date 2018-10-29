<template>
  <li class="bx--progress-step" :class="stateClass">
    <cv-progress-step-complete v-if="isComplete"/>
    <cv-progress-step-incomplete v-if="!isComplete" :is-current="isCurrent"/>
    <p class="bx--progress-label">{{label}}</p>
    <span class="bx--progress-line"></span>
  </li>
</template>

<script>
import CvProgressStepComplete from './_cv-progress-step-complete';
import CvProgressStepIncomplete from './_cv-progress-step-incomplete';

const states = {
  incomplete: 'incomplete',
  current: 'current',
  complete: 'complete',
};

export default {
  name: 'CvProgressStep',
  components: {
    CvProgressStepComplete,
    CvProgressStepIncomplete,
  },
  props: {
    label: String,
    state: {
      type: String,
      validator(val) {
        return states[val] !== undefined;
      },
    },
  },
  computed: {
    isComplete() {
      return this.state === states.complete;
    },
    isCurrent() {
      return this.state === states.current;
    },
    stateClass() {
      if (this.state === states.incmoplete) {
        return '';
      } else {
        return `bx--progress-step--${this.state}`;
      }
    },
  },
};
</script>
