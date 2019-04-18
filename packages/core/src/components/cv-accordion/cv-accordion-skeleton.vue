<template>
  <ul class="bx--accordion bx--skeleton">
    <cv-accordion-item-skeleton :open="true">
      <cv-skeleton-text width="90%"></cv-skeleton-text>
      <cv-skeleton-text width="80%"></cv-skeleton-text>
      <cv-skeleton-text width="95%"></cv-skeleton-text>
    </cv-accordion-item-skeleton>
    <cv-accordion-item-skeleton></cv-accordion-item-skeleton>
    <cv-accordion-item-skeleton></cv-accordion-item-skeleton>
    <cv-accordion-item-skeleton></cv-accordion-item-skeleton>
  </ul>
</template>

<script>
import CvSkeletonText from '../cv-skeleton-text/cv-skeleton-text';
import CvAccordionItemSkeleton from './_cv-accordion-item-skeleton';

export default {
  name: 'CvAccordionSkeleton',
  components: {
    CvSkeletonText,
    CvAccordionItemSkeleton,
  },
};
</script>
