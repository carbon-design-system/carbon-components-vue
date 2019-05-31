<template>
  <component :is="tagType" class="cv-link bx--link" v-on="$listeners" v-bind="$attrs">
    <slot></slot>
  </component>
</template>

<script>
import linkMixin from '../../mixins/link-mixin';

export default {
  name: 'CvLink',
  inheritAttrs: false,
  mixins: [linkMixin],
};
</script>
