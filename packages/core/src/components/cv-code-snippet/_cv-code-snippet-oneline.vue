<template>
  <div class="cv-code-snippet-oneline bx--snippet bx--snippet--single">
    <div class="bx--snippet-container">
      <pre>
        <slot></slot>
      </pre>
    </div>
    <cv-feedback-button :feedback="copyFeedback" :aria-label="feedbackAriaLabel" @click="$emit('copy-code')">
      <Copy16 class="bx--snippet__icon" />
    </cv-feedback-button>
  </div>
</template>

<script>
import CvFeedbackButton from './_cv-feedback-button';

import Copy16 from '@carbon/icons-vue/es/copy/16';

export default {
  name: 'CvCodeSnippetOneline',
  components: {
    CvFeedbackButton,
    Copy16,
  },
  props: {
    copyFeedback: String,
    feedbackAriaLabel: String,
  },
};
</script>
