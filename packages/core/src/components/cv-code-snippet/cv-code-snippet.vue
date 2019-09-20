<template>
  <component
    class="cv-code-snippet"
    :is="theComponent"
    v-bind="$attrs"
    @copy-code="onCopyCode"
    :copy-feedback="copyFeedback"
    :feedback-aria-label="feedbackAriaLabel"
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

export default {
  name: 'CvCodeSnippet',
  inheritAttrs: false,
  components: {
    CvCodeSnippetInline,
    CvCodeSnippetMultiline,
    CvCodeSnippetOneline,
  },
  props: {
    feedbackAriaLabel: { type: String, default: 'Copy code' },
    copyFeedback: { type: String, default: 'Copied!' },
    kind: {
      type: String,
      default: 'oneline',
      validator: value => ['inline', 'multiline', 'oneline'].includes(value),
    },
  },
  computed: {
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
