<template>
  <div class="bx--form-item">
    <cv-dropdown-inner v-bind="$attrs" v-on="$listeners" :value="value">
      <slot></slot>
    </cv-dropdown-inner>
  </div>
</template>

<script>
import CvDropdownInner from './_cv-dropdown-inner-c10';

export default {
  name: 'CvDropdownInnerFormItem',
  components: { CvDropdownInner },
  inheritAttrs: false,
  props: {
    value: String,
  },
};
</script>

<style lang="scss"></style>
