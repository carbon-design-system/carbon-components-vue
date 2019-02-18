<template>
  <component
    :is="tagType"
    v-bind="$attrs"
    v-on="$listeners"
    class="cv-checkbox"
  >
    <slot></slot>
  </component>
</template>

<script>
import CvCheckboxInnerFormItem from './_cv-checkbox-inner-form-item';
import CvCheckboxInner from './_cv-checkbox-inner';

export default {
  name: 'CvCheckbox',
  components: { CvCheckboxInnerFormItem, CvCheckboxInner },
  inheritAttrs: false,
  props: {
    formItem: { type: Boolean, default: true },
  },
  computed: {
    tagType() {
      return this.formItem
        ? 'cv-checkbox-inner-form-item'
        : 'cv-checkbox-inner';
    },
    value() {
      return this.$attrs.value;
    },
    isChecked() {
      return this.$children[0].isChecked;
    },
  },
  model: {
    prop: 'modelValue',
    event: 'modelEvent',
  },
};
</script>

<style lang="scss"></style>
