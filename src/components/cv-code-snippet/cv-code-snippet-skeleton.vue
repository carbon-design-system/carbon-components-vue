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
    kind: { type: String, default: 'single' },
  },
  computed: {
    typeClass() {
      return `bx--snippet--${this.kind}`;
    },
    multi() {
      return this.kind === 'multi';
    },
  },
};
</script>

<style lang="scss"></style>
