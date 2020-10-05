<template>
  <component :is="tagType" :class="`${carbonPrefix}--content`">
    <slot />
  </component>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvContent',
  mixins: [carbonPrefixMixin],
  props: {
    tagType: { type: String, default: 'main' },
  },
};
</script>
