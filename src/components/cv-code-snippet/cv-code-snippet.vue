<template>
  <component
    class="cv-code-snippet"
    :is="theComponent"
    v-bind="$attrs"
    @copy-code="onCopyCode"
  >
    <code ref="code"> <slot></slot> </code>
    <textarea
      class="cv-code-snippet__clippy"
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
      this.$refs.clippy.value = this.$refs.code.innerHTML;
      this.$refs.clippy.select();
      document.execCommand('copy');
    },
  },
};
</script>

<style lang="scss">
.cv-code-snippet__clippy {
  // cannot be hidden for clipboard to work
  position: absolute;
  top: -999px;
  left: -999px;
  max-width: 0;
  max-height: 0;
  overflow: 0;
  opacity: 0;
}
</style>
