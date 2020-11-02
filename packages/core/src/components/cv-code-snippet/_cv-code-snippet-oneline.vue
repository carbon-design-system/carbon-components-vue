<template>
  <div class="cv-code-snippet-oneline" :class="[`${carbonPrefix}--snippet`, `${carbonPrefix}--snippet--single`]">
    <div :class="`${carbonPrefix}--snippet-container`">
      <pre>
        <slot></slot>
      </pre>
    </div>
    <cv-feedback-button
      v-if="!hideCopyButton"
      :feedback="copyFeedback"
      :aria-label="feedbackAriaLabel"
      @click="$emit('copy-code')"
    >
      <Copy16 :class="`${carbonPrefix}--snippet__icon`" />
    </cv-feedback-button>
  </div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
import CvFeedbackButton from '../cv-feedback-button/_cv-feedback-button';
import Copy16 from '@carbon/icons-vue/es/copy/16';

export default {
  name: 'CvCodeSnippetOneline',
  mixins: [carbonPrefixMixin],
  components: {
    CvFeedbackButton,
    Copy16,
  },
  props: {
    copyFeedback: String,
    feedbackAriaLabel: String,
    hideCopyButton: Boolean,
  },
};
</script>
