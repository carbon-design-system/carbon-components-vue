<template>
  <cv-feedback-button
    class="cv-code-snippet-inline"
    :class="snippetClasses"
    :feedback="copyFeedback"
    inline
    :aria-label="feedbackAriaLabel"
    @click="$emit('copy-code')"
  >
    <slot></slot>
  </cv-feedback-button>
</template>

<script>
import CvFeedbackButton from '../cv-feedback-button/_cv-feedback-button';
import themeMixin from '../../mixins/theme-mixin';
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';

export default {
  name: 'CvCodeSnippetInline',
  mixins: [themeMixin, carbonPrefixMixin],
  components: {
    CvFeedbackButton,
  },
  props: {
    copyFeedback: String,
    feedbackAriaLabel: String,
  },
  computed: {
    snippetClasses() {
      const classes = [`${this.carbonPrefix}--snippet`, `${this.carbonPrefix}--snippet--inline`];
      if (this.theme === 'light') {
        classes.push(`${this.carbonPrefix}--snippet--light`);
      }
      return classes.join(' ');
    },
  },
};
</script>
