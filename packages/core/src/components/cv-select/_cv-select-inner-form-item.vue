<template>
  <div class="bx--form-item">
    <cv-select-inner v-bind="$attrs" v-on="$listeners" :value="value">
      <slot></slot>
    </cv-select-inner>
  </div>
</template>

<script>
import CvSelectInner from './_cv-select-inner';

export default {
  name: 'CvSelectInnerFormItem',
  components: { CvSelectInner },
  inheritAttrs: false,
  props: {
    value: String,
  },
};
</script>

<style lang="scss"></style>
