<template>
  <component
    :is="tagType"
    v-bind="$attrs"
    v-on="$listeners"
    :value="value"
    class="cv-dropdown"
  >
    <slot></slot>
  </component>
</template>

<script>
import { componentsX } from '../../_internal/_feature-flags';
import CvDropdownInnerFormItem from './_cv-dropdown-inner-form-item';
import CvDropdownInner from './_cv-dropdown-inner';

export default {
  name: 'CvDropdown',
  components: { CvDropdownInnerFormItem, CvDropdownInner },
  inheritAttrs: false,
  props: {
    value: String,
    formItem: { type: Boolean, default: componentsX },
  },
  computed: {
    tagType() {
      return this.formItem
        ? 'cv-dropdown-inner-form-item'
        : 'cv-dropdown-inner';
    },
  },
  watch: {
    value() {},
  },
  updated() {
    console.log('val:', this.value);
  },
  model: {
    prop: 'value',
    event: 'change',
  },
};
</script>

<style lang="scss"></style>
