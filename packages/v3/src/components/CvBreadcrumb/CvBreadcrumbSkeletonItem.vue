<template>
  <div :class="`${carbonPrefix}--breadcrumb-item`">
    <span :class="`${carbonPrefix}--link`">&nbsp;</span>
  </div>
</template>

<script>
import { carbonPrefix } from '../../global/settings';

export default {
  name: 'CvBreadcrumbSkeletonItem',
  setup: () => ({ carbonPrefix }),
};
</script>
