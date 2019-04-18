<template>
  <div class="bx--snippet bx--skeleton" :class="typeClass">
    <div class="bx--snippet-container">
      <span v-if="!multi" />
      <span v-if="multi" />
      <span v-if="multi" />
      <span v-if="multi" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CvCodeSnippetSkeleton',
  props: {
    kind: { type: String, default: 'oneline' },
  },
  computed: {
    typeClass() {
      return `bx--snippet--${this.multi ? 'multi' : 'single'}`;
    },
    multi() {
      return this.kind === 'multiline';
    },
  },
};
</script>
