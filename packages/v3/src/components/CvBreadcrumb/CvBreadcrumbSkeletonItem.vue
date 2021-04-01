<template>
  <div :class="breadcrumbItemClasses">
    <span :class="linkClasses">&nbsp;</span>
  </div>
</template>

<script>
import { carbonPrefix } from '../../global/settings';

export default {
  name: 'CvBreadcrumbSkeletonItem',
  setup() {
    const breadcrumbItemClasses = [`${carbonPrefix}--breadcrumb-item`];
    const linkClasses = [`${carbonPrefix}--link`];

    return { breadcrumbItemClasses, linkClasses };
  },
};
</script>
