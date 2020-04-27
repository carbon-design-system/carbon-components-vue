<template>
  <cv-feedback-button
    class="cv-code-snippet-inline bx--snippet bx--snippet--inline"
    :class="{ 'bx--snippet--light': theme === 'light' }"
    :feedback="copyFeedback"
    inline
    :aria-label="feedbackAriaLabel"
    @click="$emit('copy-code')"
  >
    <slot></slot>
  </cv-feedback-button>
</template>

<script>
import CvFeedbackButton from './_cv-feedback-button';
import themeMixin from '../../mixins/theme-mixin';

export default {
  name: 'CvCodeSnippetInline',
  mixins: [themeMixin],
  components: {
    CvFeedbackButton,
  },
  props: {
    copyFeedback: String,
    feedbackAriaLabel: String,
  },
};
</script>
