<template>
  <ul
    :class="[
      `${carbonPrefix}--accordion ${carbonPrefix}--skeleton`,
      {
        [`${carbonPrefix}--accordion--${align}`]: align,
        [`${carbonPrefix}--accordion--${size}`]: size,
      },
    ]"
  >
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
import { carbonPrefixMixin } from '../../mixins';

export default {
  name: 'CvAccordionSkeleton',
  props: {
    align: { type: String, default: 'start', validator: val => ['start', 'end', ''].includes(val) },
    size: {
      type: String,
      default: '',
      validator: val => ['sm', 'xl', ''].includes(val),
    },
  },
  mixins: [carbonPrefixMixin],
  components: {
    CvSkeletonText,
    CvAccordionItemSkeleton,
  },
};
</script>
