<template>
  <component
    :is="element.tag"
    class="cv-list"
    :class="element.selector"
    >
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
    element() {
      let _element;

      if (this.ordered) {
        _element = { tag: 'ol', selector: 'bx--list--ordered' };
      } else {
        _element = { tag: 'ul', selector: 'bx--list--unordered' };
      }

      if (this.nested) {
        _element.selector = 'bx--list--nested';
      }

      return _element;
    },
  },
};
</script>

<style lang="scss">
@import '~carbon-components/scss/components/list/list';
</style>
