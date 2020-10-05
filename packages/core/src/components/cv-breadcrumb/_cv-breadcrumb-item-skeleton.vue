<template>
  <div :class="`${carbonPrefix}--breadcrumb-item`">
    <a :class="`${carbonPrefix}--link`">&nbsp;</a>
  </div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvBreadcrumbItemSkeleton',
  mixins: [carbonPrefixMixin],
};
</script>
