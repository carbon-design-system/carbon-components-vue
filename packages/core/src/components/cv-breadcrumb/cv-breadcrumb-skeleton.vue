<template>
  <nav :class="`${carbonPrefix}--breadcrumb ${carbonPrefix}--skeleton`" :aria-label="ariaLabel">
    <cv-breadcrumb-item-skeleton></cv-breadcrumb-item-skeleton>
    <cv-breadcrumb-item-skeleton></cv-breadcrumb-item-skeleton>
    <cv-breadcrumb-item-skeleton></cv-breadcrumb-item-skeleton>
  </nav>
</template>

<script>
import CvBreadcrumbItemSkeleton from './_cv-breadcrumb-item-skeleton';
import { carbonPrefixMixin } from '../../mixins';

export default {
  name: 'CvBreadcrumbSkeleton',
  mixins: [carbonPrefixMixin],
  components: {
    CvBreadcrumbItemSkeleton,
  },
  props: {
    ariaLabel: { type: String, default: 'breadcrumb' },
  },
};
</script>
