<template>
  <nav class="bx--breadcrumb bx--skeleton" :aria-label="ariaLabel">
    <cv-breadcrumb-item-skeleton></cv-breadcrumb-item-skeleton>
    <cv-breadcrumb-item-skeleton></cv-breadcrumb-item-skeleton>
    <cv-breadcrumb-item-skeleton></cv-breadcrumb-item-skeleton>
  </nav>
</template>

<script>
import CvBreadcrumbItemSkeleton from './_cv-breadcrumb-item-skeleton';

export default {
  name: 'CvBreadcrumbSkeleton',
  components: {
    CvBreadcrumbItemSkeleton,
  },
  props: {
    ariaLabel: { type: String, default: 'breadcrumb' },
  },
};
</script>
