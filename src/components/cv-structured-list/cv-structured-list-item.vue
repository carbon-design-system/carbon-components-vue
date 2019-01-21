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
  components: { CvStructuredListItemStandard, CvStructuredListItemSelectable },
  props: {
    value: { type: String, default: '' },
    modelValue: { type: String },
  },
  computed: {
    tagType() {
      return this.selectable
        ? 'cv-structured-list-item-selectable'
        : 'cv-structured-list-item-standard';
    },
    selectable() {
      return this.$parent.selectable;
    },
  },
  methods: {
    onItemChange(val) {
      // this along with relevant props propogates the onItemChange upawards to cv-structured-list
      if (this.$parent.onItemChange) {
        this.$parent.onItemChange(val);
      }
      this.$emit('change', this.value);
    },
  },
  model: {
    prop: 'modelValue',
    event: 'change',
  },
};
</script>

<style lang="scss"></style>
