<template>
  <component
    :is="tagType"
    class="cv-list"
    :class="{
      'bx--list--nested': nested,
      'bx--list--ordered': internalOrdered,
      'bx--list--unordered': !internalOrdered,
    }"
    :data-nested="nested"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'CvList',
  props: {
    ordered: { type: Boolean, default: undefined },
    nested: Boolean,
  },
  computed: {
    internalOrdered() {
      if (this.nested && this.ordered === undefined) {
        if (this.$parent && this.$parent.$parent && this.$parent.$parent.$_CvList) {
          return this.$parent.$parent.internalOrdered;
        }
      }
      return this.ordered;
    },
    tagType() {
      return this.internalOrdered ? 'ol' : 'ul';
    },
  },
  created() {
    this.$_CvList = true;
  },
};
</script>
