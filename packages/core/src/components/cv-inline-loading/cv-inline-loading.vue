<template>
  <div data-inline-loading class="bx--inline-loading" role="alert" aria-live="assertive">
    <div class="bx--inline-loading__animation">
      <cv-loading :hidden="internalState !== STATES.LOADING" small />
      <CheckmarkFilled16 :hidden="internalState !== STATES.LOADED" class="bx--inline-loading__checkmark-container" />
      <Error20 :hidden="internalState !== STATES.ERROR" class="bx--inline-loading--error" />
    </div>
    <p class="bx--inline-loading__text">{{ stateText }}</p>
  </div>
</template>

<script>
import { STATES } from './consts';
import CvLoading from '../cv-loading/cv-loading';
import Error20 from '@carbon/icons-vue/lib/error/20';
import CheckmarkFilled16 from '@carbon/icons-vue/lib/checkmark--filled/16';

export default {
  name: 'CvInlineLoading',
  components: { CvLoading, Error20, CheckmarkFilled16 },
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
    errorText: { type: String, default: 'Loading data failed.' },
    loadingText: { type: String, default: 'Loading data...' },
    loadedText: { type: String, default: 'Data loaded.' },
    state: {
      type: String,
      default: undefined,
      validator: val => {
        if (Object.keys(STATES).some(state => STATES[state] === val)) {
          return true;
        } else {
          console.error(`CvInlineLoading: Valid states are ${STATES}`);
          return false;
        }
      },
    },
  },
  computed: {
    internalState() {
      if (this.state !== undefined) {
        return this.state;
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
