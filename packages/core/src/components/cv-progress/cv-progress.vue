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
  data() {
    return {
      // TODO: Manage current step or leave this to user?
      // NOTE: Decision impacts on whether or not methods are useful
      currentStep: -1,
    };
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
  watch: {
    // initialStep() {
    //   if (!this.$slots.default) {
    //     // only works if no slot passed
    //     // this.currentStep = this.initialStep;
    //     this.processState();
    //   }
    // },
  },
  computed: {
    state() {
      return step => {
        if (this.componentsX) {
          console.warn('CvProgress: method deprecated');
          return;
        }

        if (step > this.currentStep) {
          return 'incomplete';
        } else {
          return step < this.currentStep ? 'complete' : 'current';
        }
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
      if (this.componentsX) {
        console.warn('CvProgress: method deprecated');
        return;
      }

      return { order: current + 1, component: this.$refs.steps[current] };
    },
    getSteps() {
      if (this.componentsX) {
        console.warn('CvProgress: method deprecated');
        return;
      }

      let index = 1;
      const steps = [];
      for (let step of this.$refs.steps) {
        steps.push({ order: index, component: step });
        index++;
      }
      return steps;
    },
    setCurrent(step) {
      if (this.componentsX) {
        console.warn('CvProgress: method deprecated');
        return;
      }

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
