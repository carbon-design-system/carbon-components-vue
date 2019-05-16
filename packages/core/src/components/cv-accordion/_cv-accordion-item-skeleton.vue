<template>
  <li class="bx--accordion__item" :class="{ 'bx--accordion__item--active': open }">
    <button disabled type="button" class="bx--accordion__heading">
      <ChevronRight16 class="bx--accordion__arrow" />
      <cv-skeleton-text class="bx--accordion__title"></cv-skeleton-text>
    </button>
    <div class="bx--accordion__content">
      <slot></slot>
    </div>
  </li>
</template>

<script>
import CvSkeletonText from '../cv-skeleton-text/cv-skeleton-text';
import ChevronRight16 from '@carbon/icons-vue/es/chevron--right/16';

export default {
  name: 'CvAccordionItemSkeleton',
  components: {
    ChevronRight16,
    CvSkeletonText,
  },
  props: {
    open: { type: Boolean, default: false },
  },
};
</script>
