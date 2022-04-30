<template>
  <cvi-copy-button
    :class="`${carbonPrefix}--copy-btn`"
    :aria-label="iconDescription"
    :title="iconDescription"
    :feedback="feedback"
    :feedback-timeout="feedbackTimeout"
    @copy="$emit('copy')"
  >
    <copy16 :class="`${carbonPrefix}--snippet__icon`" />
  </cvi-copy-button>
</template>

<script>
import { Copy16 } from '@carbon/icons-vue';
import { carbonPrefix } from '../../global/settings';
import CviCopyButton from './_CviCopyButton';

export default {
  name: 'CvCopyButton',
  props: {
    /** Text shown when button is clicked */
    feedback: {
      type: String,
      default: 'Copied!',
    },
    /** How long the feedback text stays visible for */
    feedbackTimeout: {
      type: Number,
      default: 2000,
    },
    /** A11y description for copy icon */
    iconDescription: {
      type: String,
      default: 'Copy to clipboard',
    },
  },
  emits: [
    /** Emitted when user clicks on the button */
    'copy',
  ],
  components: { CviCopyButton, Copy16 },
  setup: () => ({ carbonPrefix }),
};
</script>
