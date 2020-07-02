<template>
  <div :class="`cv-form-item ${carbonPrefix}--form-item`">
    <slot></slot>
  </div>
</template>

<script>
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';
export default {
  name: 'CvFormItem',
  mixins: [carbonPrefixMixin],
};
</script>
