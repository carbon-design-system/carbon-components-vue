<template>
  <ul
    data-progress
    data-progress-current
    class="cv-progress bx--progress"
    :class="{ 'bx--progress--vertical': vertical }"
  >
    <slot>
      <cv-progress-step
        v-for="(step, index) in steps"
        :key="`step:${index}`"
        :label="step"
        :complete="initialStep > index"
        ref="steps"
      />
    </slot>
  </ul>
</template>

<script>
import CvProgressStep from './cv-progress-step';

export default {
  name: 'CvProgress',
  components: {
    CvProgressStep,
  },
  props: {
    initialStep: { type: Number, default: 0 },
    steps: Array,
    vertical: Boolean,
  },
  created() {
    // add these on created otherwise cv:mounted is too late.
    this.$on('cv:completed', srcComponent => this.onCvCompleted(srcComponent));
    this.$on('cv:mounted', srcComponent => this.onCvMount(srcComponent));
    this.$on('cv:beforeDestroy', srcComponent => this.onCvBeforeDestroy(srcComponent));
  },
  computed: {
    state() {
      return () => {
        console.warn('CvProgress: method deprecated');
        return;
      };
    },
  },
  methods: {
    onCvMount() {
      this.processState();
    },
    onCvBeforeDestroy() {
      this.processState();
    },
    onCvCompleted() {
      this.processState();
    },
    processState() {
      const steps = this.$children.filter(child => child.$_CvProgressStep);
      let newStep = -1;
      for (let i = 0; i < steps.length; i++) {
        if (!steps[i].complete && newStep < 0) {
          newStep = i;
          steps[i].internalState = 0;
        } else {
          steps[i].internalState = newStep < 0 ? 1 : -1;
        }
      }
    },
    getCurrent() {
      console.warn('CvProgress: method deprecated');
    },
    getSteps() {
      console.warn('CvProgress: method deprecated');
    },
    setCurrent() {
      console.warn('CvProgress: method deprecated');
    },
  },
};
</script>
