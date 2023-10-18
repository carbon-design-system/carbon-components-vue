<!--suppress HtmlUnknownTag -->
<template>
  <li
    :id="uid"
    :class="[
      `cv-progress-step ${carbonPrefix}--progress-step`,
      `${carbonPrefix}--progress-step--${internalState}`,
    ]"
    :aria-disabled="disabled"
  >
    <button
      type="button"
      :class="[
        `${carbonPrefix}--progress-step-button`,
        { [`${carbonPrefix}--progress-step-button--unclickable`]: isCurrent },
      ]"
      tabindex="-1"
      :title="label"
      @click.prevent="emit('step-clicked', { uid })"
    >
      <span v-if="isCurrent" :class="`${carbonPrefix}--assistive-text`"
        >Current</span
      >
      <slot name="step-icon">
        <component :is="stepIcon" :class="stepClass">
          <title>{{ description }}</title>
        </component>
      </slot>
      <div
        :class="`${carbonPrefix}--progress-text`"
        :style="{ maxWidth: isEqual ? 'calc(100% - 1rem)' : undefined }"
      >
        <!-- todo: add tooltip when tooltip is implemented -->
        <!-- <cv-tooltip v-if="tipText" ... v-else -->
        <div :class="[`${carbonPrefix}--progress-label`]">
          {{ label }}
        </div>
        <p v-if="additionalInfo" class="bx--progress-optional">
          {{ additionalInfo }}
        </p>
      </div>
      <span :class="`${carbonPrefix}--progress-line`"></span>
    </button>
  </li>
</template>

<script setup>
import {
  Incomplete16,
  CheckmarkOutline16,
  Warning16,
  CircleDash16,
} from '@carbon/icons-vue';
// noinspection ES6PreferShortImport
import { carbonPrefix } from '../../global/settings';
import { useCvId, props as propsCvId } from '../../use/cvId';
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const STEP_CURRENT = 'current';
const STEP_COMPLETE = 'complete';
const STEP_INCOMPLETE = 'incomplete';
const STEP_DISABLED = 'disabled';

const props = defineProps({
  additionalInfo: { type: String, default: undefined },
  description: { type: String, default: undefined },
  disabled: Boolean,
  invalid: Boolean,
  label: { type: String, default: undefined },
  tipText: { type: String, default: undefined },
  complete: Boolean,
  ...propsCvId,
});
const uid = useCvId(props, true);
const isEqual = inject('progress-space-equally');

const emit = defineEmits(['step-clicked']);

const internalState = ref(STEP_INCOMPLETE);
/**
 * @type {Ref<UnwrapRef<string>>}
 */
const currentStep = inject('progress-current-step');
const isCurrent = computed(() => {
  return uid.value === currentStep.value;
});
/**
 * @type {Ref<UnwrapRef<Array<ProgressStepData>>>}
 */
const progressSteps = inject('progress-steps');
/**
 * @type {Ref<UnwrapRef<Set<string>>>}
 */
const completedSteps = inject('progress-completed-steps');
function checkCurrentStep() {
  if (props.disabled) internalState.value = STEP_DISABLED;
  else if (isCurrent.value) internalState.value = STEP_CURRENT;
  else if (props.complete) internalState.value = STEP_COMPLETE;
  else internalState.value = STEP_INCOMPLETE;

  const stepData = { uid: uid.value, state: internalState.value };
  const index = progressSteps.value.findIndex(step => step.uid === uid.value);
  if (index > -1) progressSteps.value.splice(index, 1, stepData);
  else progressSteps.value.push(stepData);
}
onMounted(checkCurrentStep);
watch(currentStep, checkCurrentStep);
watch(completedSteps, checkCurrentStep);

onBeforeUnmount(() => {
  const index = progressSteps.value.findIndex(step => step.uid === uid.value);
  if (index > -1) progressSteps.value.splice(index, 1);
});
const stepClass = computed(() => {
  return props.invalid ? `${carbonPrefix}--progress__warning` : '';
});

const stepIcon = computed(() => {
  if (props.invalid) return Warning16;
  else if (internalState.value === STEP_CURRENT) return Incomplete16;
  else if (internalState.value === STEP_COMPLETE) return CheckmarkOutline16;
  else return CircleDash16;
});
</script>
