<template>
  <component :is="tagType.tag" class="cv-list" :class="tagType.selector">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'CvList',
  props: {
    ordered: Boolean,
    nested: Boolean,
  },
  computed: {
    tagType() {
      let _tagType;

      if (this.ordered) {
        _tagType = { tag: 'ol', selector: 'bx--list--ordered' };
      } else {
        _tagType = { tag: 'ul', selector: 'bx--list--unordered' };
      }

      if (this.nested) {
        _tagType.selector = 'bx--list--nested';
      }

      return _tagType;
    },
  },
};
</script>

<style lang="scss"></style>
