<template>
  <component
    :is="tagType"
    v-bind="$attrs"
    v-on="$listeners"
    class="cv-structured-list-item"
    :value="value"
    :modelValue="modelValue"
  >
    <slot></slot>
  </component>
</template>

<script>
import CvStructuredListItemStandard from './_cv-structured-list-item-standard';
import CvStructuredListItemSelectable from './_cv-structured-list-item-selectable';

export default {
  name: 'CvStructuredListItem',
  inheritAttrs: false,
  components: { CvStructuredListItemStandard, CvStructuredListItemSelectable },
  props: {
    value: { type: String, default: '' },
    modelValue: { type: String },
  },
  mounted() {
    // pass on cv-structured-list-item-selectable change events
    this.$on('cv:change', val => {
      this.$parent.$emit('cv:change', this.value); // emit to parent
      this.$emit('change', val);
    });
  },
  computed: {
    tagType() {
      return this.selectable ? 'cv-structured-list-item-selectable' : 'cv-structured-list-item-standard';
    },
    selectable() {
      return this.$parent.selectable;
    },
  },
  model: {
    prop: 'modelValue',
    event: 'change',
  },
};
</script>
