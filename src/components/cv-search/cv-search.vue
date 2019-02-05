<template>
  <component
    :is="tagType"
    v-bind="$attrs"
    v-on="$listeners"
    :value="value"
    class="cv-search"
  >
    <slot></slot>
  </component>
</template>

<script>
import CvSearchInnerFormItem from './_cv-search-inner-form-item';
import CvSearchInner from './_cv-search-inner';

export default {
  name: 'CvSearch',
  components: { CvSearchInnerFormItem, CvSearchInner },
  inheritAttrs: false,
  props: {
    value: String,
    formItem: { type: Boolean, default: true },
  },
  computed: {
    tagType() {
      return this.formItem ? 'cv-search-inner-form-item' : 'cv-search-inner';
    },
  },
};
</script>

<style lang="scss"></style>
