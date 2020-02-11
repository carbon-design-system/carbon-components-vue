<template>
  <div data-inline-loading class="bx--inline-loading" role="alert" aria-live="assertive">
    <div class="bx--inline-loading__animation" :class="{ 'bx--loading--stop': internalState === STATES.ENDING }">
      <div
        v-show="internalState === STATES.LOADING || internalState === STATES.ENDING"
        class="bx--loading bx--loading--small"
      >
        <svg class="bx--loading__svg" viewBox="-75 -75 150 150">
          <circle class="bx--loading__background" cx="0" cy="0" r="26.8125" />
          <circle class="bx--loading__stroke" cx="0" cy="0" r="26.8125" />
        </svg>
      </div>
      <CheckmarkFilled16 :hidden="internalState !== STATES.LOADED" class="bx--inline-loading__checkmark-container" />
      <ErrorFilled16 :hidden="internalState !== STATES.ERROR" class="bx--inline-loading--error" />
    </div>
    <p class="bx--inline-loading__text">{{ stateText }}</p>
  </div>
</template>

<script>
import { STATES } from './consts';
import ErrorFilled16 from '@carbon/icons-vue/lib/error--filled/16';
import CheckmarkFilled16 from '@carbon/icons-vue/lib/checkmark--filled/16';

export default {
  name: 'CvInlineLoading',
  components: { ErrorFilled16, CheckmarkFilled16 },
  created() {
    this.STATES = STATES;
  },
  props: {
    active: {
      type: Boolean,
      default: undefined,
      validator: val => {
        if (val !== undefined && process.env.NODE_ENV === 'development') {
          console.warn('CvInlineLoading: active prop deprecated in favour of state prop');
        }
        return true;
      },
    },
    endingText: { type: String, default: 'Load ending...' },
    errorText: { type: String, default: 'Loading data failed.' },
    loadingText: { type: String, default: 'Loading data...' },
    loadedText: { type: String, default: 'Data loaded.' },
    state: {
      type: String,
      default: undefined,
      validator: val => {
        if (Object.keys(STATES).some(state => STATES[state] === val.toLowerCase())) {
          return true;
        } else {
          console.error(`CvInlineLoading: Valid states are ${JSON.stringify(Object.values(STATES))}`);
          return false;
        }
      },
    },
  },
  computed: {
    internalState() {
      if (this.state !== undefined) {
        return this.state.toLowerCase();
      } else {
        return this.active ? STATES.LOADING : STATES.LOADED;
      }
    },
    stateText() {
      switch (this.internalState) {
        case STATES.LOADED:
          return this.loadedText;
        case STATES.ERROR:
          return this.errorText;
        case STATES.ENDING:
          return this.endingText;
        default:
          return this.loadingText;
      }
    },
    CONSTS() {
      return { STATES };
    },
  },
  CONSTS() {
    return { STATES };
  },
};
</script>
