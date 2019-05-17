<template>
  <ul data-progress data-progress-current class="cv-progress bx--progress">
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
  },
  created() {
    // add these on created otherwise cv:mounted is too late.
    this.$on('cv:completed', srcComponent => this.onCvCompleted(srcComponent));
    this.$on('cv:mounted', srcComponent => this.onCvMount(srcComponent));
    this.$on('cv:beforeDestroy', srcComponent => this.onCvBeforeDestroy(srcComponent));
  },
  mounted() {
    this.currentStep = this.initialStep;
  },
  computed: {
    state() {
      return step => {
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
      let newCurrentStep = -1;
      for (let i = 0; i < steps.length; i++) {
        if (!steps[i].complete && newCurrentStep < 0) {
          newCurrentStep = i;
          steps[i].internalState = 0;
        } else {
          steps[i].internalState = newCurrentStep < 0 ? 1 : -1;
        }
      }
      this.currentStep = newCurrentStep;
    },
    getCurrent() {
      console.warn('CvProgress: method deprecated');
    },
    getSteps() {
      console.warn('CvProgress: method deprecated');
    },
    setCurrent(step) {
      console.warn('CvProgress: method deprecated');
    },
  },
};
</script>
