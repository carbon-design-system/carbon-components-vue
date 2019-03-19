<template>
  <component :is="tagType" v-bind="$attrs" v-on="$listeners" :value="value" class="cv-select">
    <slot></slot>
  </component>
</template>

<script>
import CvSelectInnerFormItem from './_cv-select-inner-form-item';
import CvSelectInner from './_cv-select-inner';

export default {
  name: 'CvSelect',
  components: { CvSelectInnerFormItem, CvSelectInner },
  inheritAttrs: false,
  props: {
    value: String,
    formItem: { type: Boolean, default: true },
  },
  computed: {
    tagType() {
      return this.formItem ? 'cv-select-inner-form-item' : 'cv-select-inner';
    },
  },
};
</script>

<style lang="scss"></style>
