<template>
  <div
    class="cv-code-snippet-multiline"
    :class="[
      `${carbonPrefix}--snippet`,
      `${carbonPrefix}--snippet--multi`,
      { [`${carbonPrefix}--snippet--expand`]: expanded, [`${carbonPrefix}--snippet--light`]: theme === 'light' },
    ]"
    data-code-snippet
  >
    <div :class="`${carbonPrefix}--snippet-container`">
      <pre>
        <slot></slot>
      </pre>
    </div>
    <cv-feedback-button :feedback="copyFeedback" :aria-label="feedbackAriaLabel" @click="$emit('copy-code')">
      <Copy16 :class="`${carbonPrefix}--snippet__icon`" />
    </cv-feedback-button>

    <cv-button
      type="button"
      kind="ghost"
      size="small"
      :class="`${carbonPrefix}--snippet-btn--expand`"
      @click="toggleExpand"
    >
      <span :class="`${carbonPrefix}--snippet-btn--text`">{{ expandButtonText }}</span>
      <ChevronDown16 :class="`${carbonPrefix}--icon-chevron--down`" />
    </cv-button>
  </div>
</template>

<script>
import CvFeedbackButton from '../cv-feedback-button/_cv-feedback-button';
import CvButton from '../cv-button/cv-button';

import Copy16 from '@carbon/icons-vue/es/copy/16';
import ChevronDown16 from '@carbon/icons-vue/es/chevron--down/16';
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';
import themeMixin from '../../mixins/theme-mixin';

export default {
  name: 'CvCodeSnippetMultiline',
  mixins: [themeMixin, carbonPrefixMixin],
  components: {
    CvButton,
    CvFeedbackButton,
    Copy16,
    ChevronDown16,
  },
  props: {
    lessText: { type: String, default: 'Show less' },
    moreText: { type: String, default: 'Show more' },
    feedbackAriaLabel: String,
    copyFeedback: String,
  },
  data() {
    return {
      expanded: false,
    };
  },
  computed: {
    expandButtonText() {
      return this.expanded ? this.lessText : this.moreText;
    },
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded;
    },
  },
};
</script>
