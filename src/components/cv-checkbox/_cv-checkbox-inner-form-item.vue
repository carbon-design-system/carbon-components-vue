<template>
  <div class="bx--form-item">
    <cv-checkbox-inner v-bind="$attrs" v-on="$listeners">
      <slot />
    </cv-checkbox-inner>
  </div>
</template>

<script>
import CvCheckboxInner from './_cv-checkbox-inner';

export default {
  name: 'CvCheckboxInnerFormItem',
  components: { CvCheckboxInner },
  inheritAttrs: false,
};
</script>

<style lang="scss"></style>
