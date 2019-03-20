<template>
  <div class="bx--form-item">
    <cv-search-inner v-bind="$attrs" v-on="$listeners" :value="value">
      <slot></slot>
    </cv-search-inner>
  </div>
</template>

<script>
import CvSearchInner from './_cv-search-inner';

export default {
  name: 'CvSearchInnerFormItem',
  components: { CvSearchInner },
  inheritAttrs: false,
  props: {
    value: String,
  },
};
</script>

<style lang="scss"></style>
