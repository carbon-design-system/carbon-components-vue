<template>
  <div
    :class="[
      `${carbonPrefix}--snippet`,
      `${carbonPrefix}--snippet--single`,
      {
        [`${carbonPrefix}--snippet--no-copy`]: hideCopyButton,
        [`${carbonPrefix}--snippet--disabled`]: disabled,
        [`${carbonPrefix}--snippet--light`]: light,
      },
    ]"
  >
    <div
      role="textbox"
      :tabindex="disabled ? undefined : 0"
      :class="`${carbonPrefix}--snippet-container`"
      :aria-label="ariaLabel || 'code-snippet'"
      ref="container"
    >
      <code>
        <pre ref="text"><slot /></pre>
      </code>
    </div>
    <div
      v-if="hasOverflowLeft"
      :class="`${carbonPrefix}--snippet__overflow-indicator--left`"
    ></div>
    <div
      v-if="hasOverflowRight"
      :class="`${carbonPrefix}--snippet__overflow-indicator--right`"
    ></div>
    <cv-copy-button
      v-if="!hideCopyButton"
      :feedback="copyFeedback"
      :feedback-timeout="copyFeedbackTimeout"
      :icon-description="ariaLabel"
      @copy="handleCopy"
      :disabled="disabled"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import { carbonPrefix } from '../../global/settings';
import { useElementHasOverflow } from '../../use/overflow';
import CvCopyButton from '../CvCopyButton/CvCopyButton';

export default {
  inheritAttrs: false,
  props: {
    /** Text shown to user when copying code */
    copyFeedback: {
      type: String,
      default: 'Copied!',
    },
    /** How long should the copy feedback text be shown? */
    copyFeedbackTimeout: {
      type: Number,
      default: 2000,
    },
    /** Should the copy button be hidden? */
    hideCopyButton: {
      type: Boolean,
      default: false,
    },
    /** Should the code wrap if it's too long? */
    wrapText: {
      type: Boolean,
      default: false,
    },
    /** Disable copying */
    disabled: {
      type: Boolean,
      default: false,
    },
    /** A11y label */
    ariaLabel: {
      type: String,
      default: '',
    },
    /** Use the light variant */
    light: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    CvCopyButton,
  },
  setup: (props, { emit }) => {
    const text = ref(null);
    const container = ref(null);

    const { hasOverflowLeft, hasOverflowRight } = useElementHasOverflow(
      container
    );

    const handleCopy = () => emit('copy', text.value?.innerText);

    return {
      carbonPrefix,
      container,
      handleCopy,
      hasOverflowLeft,
      hasOverflowRight,
      text,
    };
  },
};
</script>
