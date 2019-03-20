<template>
  <nav class="bx--breadcrumb bx--skeleton" aria-label="breadcrumb">
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
};
</script>

<style lang="scss"></style>
