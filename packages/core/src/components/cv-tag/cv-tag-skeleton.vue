<template>
  <div :class="`cv-tag ${carbonPrefix}--tag ${carbonPrefix}--skeleton`"></div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvTagSkeleton',
  mixins: [carbonPrefixMixin],
};
</script>
