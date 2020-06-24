<template>
  <div :class="typeClass">
    <div :class="`${carbonPrefix}--snippet-container`">
      <span />
      <span v-if="multi" />
      <span v-if="multi" />
    </div>
  </div>
</template>

<script>
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';

export default {
  name: 'CvCodeSnippetSkeleton',
  mixins: [carbonPrefixMixin],
  props: {
    kind: { type: String, default: 'oneline' },
  },
  computed: {
    typeClass() {
      return `${carbonPrefix}--snippet ${carbonPrefix}--skeleton ${carbonPrefix}--snippet--${
        this.multi ? 'multi' : 'single'
      }`;
    },
    multi() {
      return this.kind === 'multiline';
    },
  },
};
</script>
