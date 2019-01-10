<template>
  <ul data-progress data-progress-current class="cv-progress bx--progress">
    <cv-progress-step
      v-for="(step, index) in steps"
      :key="index"
      :label="step"
      :state="state(index)"
      ref="steps"
    />
  </ul>
</template>

<script>
import CvProgressStep from './_cv-progress-step';

export default {
  name: 'CvProgress',
  components: {
    CvProgressStep,
  },
  props: {
    initialStep: { type: Number, default: 0 },
    steps: { type: Array, required: true },
  },
  data() {
    return {
      // TODO: Manage current step or leave this to user?
      // NOTE: Decision impacts on whether or not methods are useful
      currentStep: 0,
    };
  },
  mounted() {
    this.currentStep = this.initialStep;
  },
  watch: {
    initialStep() {
      this.currentStep = this.initialStep;
    },
  },
  computed: {
    state() {
      return step => {
        if (step > this.currentStep) {
          return 'incomplete';
        } else {
          return step < this.currentStep ? 'complete' : 'current';
        }
      };
    },
  },
  methods: {
    getCurrent() {
      return { order: current + 1, component: this.$refs.steps[current] };
    },
    getSteps() {
      let index = 1;
      const steps = [];
      for (let step of this.$refs.steps) {
        steps.push({ order: index, component: step });
        index++;
      }
      return steps;
    },
    setCurrent(step) {
      if (step > this.steps.length) {
        this.currentStep = this.steps.length - 1;
      } else {
        this.currentStep = Math.max(0, step);
      }
    },
  },
};
</script>

<style lang="scss"></style>
