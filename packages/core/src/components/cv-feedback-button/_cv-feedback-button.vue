<template>
  <button
    aria-label="ariaLabel"
    type="button"
    class="cv-feedback-button"
    v-bind="$attrs"
    data-copy-btn
    :class="{
      [`${carbonPrefix}--copy-btn`]: !inline,
      [`${carbonPrefix}--copy-btn--animating`]: feedbackPhase && feedbackPhase !== feedbackPhases.DEFAULT,
      [`${carbonPrefix}--copy-btn--fade-in`]: feedbackPhase && feedbackPhase === feedbackPhases.FADE_IN,
      [`${carbonPrefix}--copy-btn--fade-out`]: feedbackPhase && feedbackPhase === feedbackPhases.FADE_OUT,
    }"
    @click="onClick"
    @animationend="onAnimationEnd"
  >
    <slot></slot>
    <span :class="`${carbonPrefix}--assistive-text ${carbonPrefix}--copy-btn__feedback`">{{ feedback }}</span>
  </button>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
const feedbackPhases = {
  DEFAULT: 0,
  FADE_IN: 1,
  ACTIVE: 2,
  FADE_OUT: 3,
};
export default {
  name: 'cvFeedbackButton',
  mixins: [carbonPrefixMixin],
  inheritAttrs: false,
  props: {
    ariaLabel: { type: String, default: 'Feedback button' },
    feedback: { type: String, required: true },
    inline: Boolean,
    timeout: { type: Number, default: 2000 },
  },
  created() {
    this.feedbackPhases = feedbackPhases;
  },
  data() {
    return {
      feedbackPhase: feedbackPhases.DEFAULT,
    };
  },
  methods: {
    onClick() {
      if (this.feedbackPhase === feedbackPhases.DEFAULT) {
        this.$emit('click');

        // start fade in animation
        this.feedbackPhase = feedbackPhases.FADE_IN;
      }
    },
    onAnimationEnd() {
      if (this.feedbackPhase === feedbackPhases.FADE_IN) {
        // fade in animation complete
        this.feedbackPhase = feedbackPhases.ACTIVE;

        setTimeout(() => {
          // queue fade out
          this.feedbackPhase = feedbackPhases.FADE_OUT;
        }, 2000);
      }
      if (this.feedbackPhase === feedbackPhases.FADE_OUT) {
        // reset to start
        this.feedbackPhase = feedbackPhases.DEFAULT;
      }
    },
  },
};
</script>
