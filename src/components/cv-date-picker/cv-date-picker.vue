<template>
  <component
    :is="tagType"
    v-bind="$attrs"
    v-on="$listeners"
    class="cv-data-picker"
  >
    <slot></slot>
  </component>
</template>

<script>
import CvDatePickerInnerC10 from './_cv-date-picker-inner-c10';
import CvDatePickerInner from './_cv-date-picker-inner';
import { componentsX } from '../../_internal/_feature-flags';

export default {
  name: 'CvdataPicker',
  components: { CvDatePickerInnerC10, CvDatePickerInner },
  inheritAttrs: false,
  props: {
    formItem: { type: Boolean, default: true },
  },
  computed: {
    tagType() {
      return componentsX ? 'cv-date-picker-inner-c10' : 'cv-date-picker-inner';
    },
  },
};
</script>

<style lang="scss"></style>
