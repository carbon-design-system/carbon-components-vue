<template>
  <ul
    data-progress
    data-progress-current
    :class="[
      `cv-progress ${carbonPrefix}--progress`,
      { [`${carbonPrefix}--progress--space-equal`]: isEqual },
      { [`${carbonPrefix}--progress--vertical`]: vertical },
    ]"
  >
    <slot>
      <cv-progress-step
        v-for="(step, index) in steps"
        :key="`step:${index}:${initialStep > index}`"
        :label="step"
        :complete="initialStep > index"
        @step-clicked="emit('step-clicked', { ...$event, index })"
      />
    </slot>
  </ul>
</template>

<script setup>
// noinspection ES6PreferShortImport
import { carbonPrefix } from '../../global/settings';
import CvProgressStep from './CvProgressStep.vue';
import { computed, onMounted, provide, ref, watch } from 'vue';

const props = defineProps({
  /**
   * Optionally specify the current step array index
   */
  initialStep: { type: Number, default: 0 },
  /**
   * An array of labels for the steps. Use `cv-progress-step` components for more control over the step logic.
   */
  steps: { type: Array, default: () => [] },
  /**
   * Determines whether the ProgressIndicator should be rendered vertically.
   */
  vertical: { type: Boolean, default: false },
  /**
   * Specify whether the progress steps should be split equally in size in the div
   */
  spaceEqually: { type: Boolean, default: false },
});
const emit = defineEmits(['step-clicked']);

const isEqual = computed(() => props.spaceEqually && !props.vertical);
provide('progress-space-equally', isEqual);
const completedSteps = ref(new Set());
provide('progress-completed-steps', completedSteps);

/**
 * @typedef ProgressStepData
 * @type {string} uid
 * @type {string} label
 */
/**
 * @type {Ref<UnwrapRef<Array<ProgressStepData>>>}
 */
const progressSteps = ref([]);
provide('progress-steps', progressSteps);

const currentStep = ref('');
provide('progress-current-step', currentStep);
function updateSteps() {
  if (
    props.initialStep > -1 &&
    props.initialStep < progressSteps.value.length
  ) {
    const step = progressSteps.value[props.initialStep];
    currentStep.value = step.uid;
  } else currentStep.value = '';
}
onMounted(updateSteps);
watch(() => props.initialStep, updateSteps);
watch(progressSteps, updateSteps);
</script>
