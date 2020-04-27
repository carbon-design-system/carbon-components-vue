<template>
  <button
    type="button"
    class="cv-feedback-button"
    v-bind="$attrs"
    data-copy-btn
    :class="buttonClasses"
    @click="onClick"
    @animationend="onAnimationEnd"
  >
    <slot></slot>
    <span :class="assistiveTextClasses">{{ feedback }}</span>
  </button>
</template>

<script>
const animationClass = 'bx--copy-btn--animating';
const fadeInClass = 'bx--copy-btn--fade-in';
const fadeOutClass = 'bx--copy-btn--fade-out';
const feedbackPhases = {
  DEFAULT: 0,
  FADE_IN: 1,
  ACTIVE: 2,
  FADE_OUT: 3,
};
export default {
  name: 'cvFeedbackButton',
  inheritAttrs: false,
  props: {
    feedback: { type: String, required: true },
    inline: Boolean,
    timeout: { type: Number, default: 2000 },
  },
  computed: {
    buttonClasses() {
      const stdClasses = this.inline ? '' : 'bx--copy-btn';
      let animationClasses;

      switch (this.feedbackPhase) {
        case feedbackPhases.FADE_IN:
          animationClasses = ` ${animationClass} ${fadeInClass}`;
          break;
        case feedbackPhases.ACTIVE:
          animationClasses = ` ${animationClass}`;
          break;
        case feedbackPhases.FADE_OUT:
          animationClasses = ` ${animationClass} ${fadeOutClass}`;
          break;
        default:
          animationClasses = '';
          break;
      }

      return `${stdClasses}${animationClasses}`;
    },
    assistiveTextClasses() {
      return `bx--assistive-text bx--copy-btn__feedback`;
    },
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
