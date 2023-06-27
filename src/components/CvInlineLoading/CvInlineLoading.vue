<template>
  <div
    data-inline-loading
    :class="`${carbonPrefix}--inline-loading`"
    role="alert"
    aria-live="assertive"
  >
    <div
      :class="[
        `${carbonPrefix}--inline-loading__animation`,
        { [`${carbonPrefix}--loading--stop`]: internalState === STATES.ENDING },
      ]"
      @animationend="onLoadingEnd"
    >
      <div
        v-show="internalActive"
        :class="`${carbonPrefix}--loading ${carbonPrefix}--loading--small`"
      >
        <cv-loading
          :class="`${carbonPrefix}--inline-loading__animation`"
          :description="description"
          :active="undefined"
          :small="true"
        />
      </div>
      <checkmark-filled16
        v-if="internalState === STATES.LOADED"
        :class="`${carbonPrefix}--inline-loading__checkmark-container`"
      />
      <error-filled16
        v-if="internalState === STATES.ERROR"
        :class="`${carbonPrefix}--inline-loading--error`"
      />
    </div>
    <p :class="`${carbonPrefix}--inline-loading__text`">{{ stateText }}</p>
  </div>
</template>

<script setup>
import { STATES } from './consts';
import ErrorFilled16 from '@carbon/icons-vue/lib/error--filled/16';
import CheckmarkFilled16 from '@carbon/icons-vue/lib/checkmark--filled/16';
import { carbonPrefix } from '../../global/settings';
import CvLoading from '../CvLoading/CvLoading.vue';
import { computed, ref, watch } from 'vue';

const props = defineProps({
  /**
   * Deprecated: Please use state property
   * @deprecated
   */
  active: {
    type: Boolean,
    default: undefined,
    deprecated: true,
    validator: val => {
      if (val !== undefined && process.env.NODE_ENV === 'development') {
        console.warn(
          'CvInlineLoading: active prop deprecated in favour of state prop'
        );
      }
      return true;
    },
  },
  /**
   * Specify the description for the inline loading text
   */
  description: { type: String, default: 'Loading' },
  /**
   * Specify the text to show while the loading is ending (state: 'ending')
   */
  endingText: { type: String, default: 'Load ending...' },
  /**
   * Specify the text to show for the error state (state: 'error')
   */
  errorText: { type: String, default: 'Loading data failed.' },
  /**
   * Specify the text to show while loading (state: 'loading')
   */
  loadingText: { type: String, default: 'Loading data...' },
  /**
   * Specify the text to show while loading (state: 'loaded')
   */
  loadedText: { type: String, default: 'Data loaded.' },
  /**
   * Specify the loading status
   * @values ['loading','ending','loaded','error']
   */
  state: {
    type: String,
    default: STATES.LOADING,
    required: true,
    validator: val => {
      if (Object.values(STATES).includes(val)) {
        return true;
      } else {
        console.error(
          `CvInlineLoading: Valid states are ${Object.values(STATES)}`
        );
        return false;
      }
    },
  },
});
const internalState = ref(stateFromProps());
function stateFromProps() {
  if (props.state.includes(':')) {
    return props.state.split(':')[0];
  } else {
    return props.state;
  }
}
watch(
  () => props.state,
  () => {
    internalState.value = stateFromProps();
  }
);
function onLoadingEnd(ev) {
  if (ev.animationName === 'rotate-end-p2' && props.state.includes(':')) {
    internalState.value = props.state.split(':')[1];
  }
}
const internalActive = computed(() => {
  if (props.active !== undefined) {
    return props.active;
  } else {
    return [STATES.LOADING, STATES.ENDING].includes(internalState.value);
  }
});

const stateText = computed(() => {
  switch (internalState.value) {
    case STATES.LOADED:
      return props.loadedText;
    case STATES.ERROR:
      return props.errorText;
    case STATES.ENDING:
      return props.endingText;
    default:
      return props.loadingText;
  }
});
</script>
