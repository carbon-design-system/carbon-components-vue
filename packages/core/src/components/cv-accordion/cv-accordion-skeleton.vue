<template>
  <ul :class="`${carbonPrefix}--accordion ${carbonPrefix}--skeleton`">
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
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';

export default {
  name: 'CvAccordionSkeleton',
  mixins: [carbonPrefixMixin],
  components: {
    CvSkeletonText,
    CvAccordionItemSkeleton,
  },
};
</script>
