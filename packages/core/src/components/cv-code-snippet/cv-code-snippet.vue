<template>
  <component
    :class="classes"
    :is="theComponent"
    v-bind="$attrs"
    @copy-code="onCopyCode"
    :copy-feedback="copyFeedback"
    :feedback-aria-label="feedbackAriaLabel"
    :hideCopyButton="hideCopyButton"
    :wrap-text="wrapText"
  >
    <code ref="code">
      <slot></slot>
    </code>
    <!-- textarea cannot be fully hidden for clipboard to work -->
    <textarea
      class="cv-code-snippet__clippy"
      style="position: absolute; left: -9999px; max-width: 0; opacity: 0; overflow: hidden;"
      aria-hidden="true"
      ref="clippy"
    ></textarea>
  </component>
</template>

<script>
import CvCodeSnippetInline from './_cv-code-snippet-inline';
import CvCodeSnippetMultiline from './_cv-code-snippet-multiline';
import CvCodeSnippetOneline from './_cv-code-snippet-oneline';
import { carbonPrefixMixin, themeMixin } from '../../mixins';

export default {
  name: 'CvCodeSnippet',
  inheritAttrs: false,
  mixins: [carbonPrefixMixin, themeMixin],
  components: {
    CvCodeSnippetInline,
    CvCodeSnippetMultiline,
    CvCodeSnippetOneline,
  },
  props: {
    feedbackAriaLabel: { type: String, default: 'Copy code' },
    copyFeedback: { type: String, default: 'Copied!' },
    hideCopyButton: Boolean,
    kind: {
      type: String,
      default: 'oneline',
      validator: value => ['inline', 'multiline', 'oneline'].includes(value),
    },
    wrapText: Boolean,
  },
  computed: {
    classes() {
      return [
        `cv-code-snippet`,
        {
          [`${this.carbonPrefix}--snippet--light`]: this.isLight,
          [`${this.carbonPrefix}--snippet--no-copy`]: this.hideCopyButton,
          [`${this.carbonPrefix}--snippet--wraptext`]: this.wrapText,
        },
      ];
    },
    theComponent() {
      switch (this.kind) {
        case 'inline':
          return 'CvCodeSnippetInline';
        case 'multiline':
          return 'CvCodeSnippetMultiline';
        default:
          return 'CvCodeSnippetOneline';
      }
    },
  },
  methods: {
    onCopyCode() {
      // copy to clipboard
      this.$refs.clippy.value = this.$refs.code.innerText;
      this.$refs.clippy.select();
      document.execCommand('copy');
    },
  },
};
</script>
