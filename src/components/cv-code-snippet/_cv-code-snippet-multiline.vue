<template>
  <div
    class="cv-code-snippet-multiline bx--snippet bx--snippet--multi"
    :class="{ 'bx--snippet--expand': expanded }"
    data-code-snippet
  >
    <div class="bx--snippet-container" aria-label="Code Snippet Text">
      <pre>
        <slot></slot>
      </pre>
    </div>
    <cv-feedback-button
      feedback="Copied!"
      aria-label="Copy code"
      @click="$emit('copy-code')"
    >
      <Copy16 v-if="componentsX" class="bx--snippet__icon" />
      <svg
        v-else
        class="bx--snippet__icon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
      >
        <path d="M1 10H0V2C0 .9.9 0 2 0h8v1H2c-.6 0-1 .5-1 1v8z"></path>
        <path
          d="M11 4.2V8h3.8L11 4.2zM15 9h-4c-.6 0-1-.4-1-1V4H4.5c-.3 0-.5.2-.5.5v10c0 .3.2.5.5.5h10c.3 0 .5-.2.5-.5V9zm-4-6c.1 0 .3.1.4.1l4.5 4.5c0 .1.1.3.1.4v6.5c0 .8-.7 1.5-1.5 1.5h-10c-.8 0-1.5-.7-1.5-1.5v-10C3 3.7 3.7 3 4.5 3H11z"
        ></path>
      </svg>
    </cv-feedback-button>

    <cv-button
      type="button"
      kind="ghost"
      small
      class="bx--snippet-btn--expand"
      @click="toggleExpand"
    >
      <span class="bx--snippet-btn--text">{{ expandButtonText }}</span>
      <ChevronDown16 v-if="componentsX" class="bx--icon-chevron--down" />
      <svg
        v-else
        class="bx--icon-chevron--down"
        width="12"
        height="7"
        viewBox="0 0 12 7"
        aria-label="Show more icon"
      >
        <title>Show more icon</title>
        <path
          fill-rule="nonzero"
          d="M6.002 5.55L11.27 0l.726.685L6.003 7 0 .685.726 0z"
        ></path>
      </svg>
    </cv-button>
  </div>
</template>

<script>
import CvFeedbackButton from './_cv-feedback-button';
import { componentsX } from '../../_internal/_feature-flags';
import Copy16 from '@carbon/icons-vue/lib/copy/16';
import ChevronDown16 from '@carbon/icons-vue/lib/chevron--down/16';

export default {
  name: 'CvCodeSnippetMultiline',
  components: {
    CvFeedbackButton,
    Copy16,
    ChevronDown16,
  },
  props: {
    lessText: { type: String, default: 'Show less' },
    moreText: { type: String, default: 'Show more' },
  },
  data() {
    return {
      componentsX,
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
