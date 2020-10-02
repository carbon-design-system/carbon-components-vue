<template>
  <div
    :class="
      `${carbonPrefix}--snippet ${carbonPrefix}--skeleton ${carbonPrefix}--snippet--${multi ? 'multi' : 'single'}`
    "
  >
    <div :class="`${carbonPrefix}--snippet-container`">
      <span />
      <span v-if="multi" />
      <span v-if="multi" />
    </div>
  </div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';

export default {
  name: 'CvCodeSnippetSkeleton',
  mixins: [carbonPrefixMixin],
  props: {
    kind: { type: String, default: 'oneline' },
  },
  computed: {
    multi() {
      return this.kind === 'multiline';
    },
  },
};
</script>
