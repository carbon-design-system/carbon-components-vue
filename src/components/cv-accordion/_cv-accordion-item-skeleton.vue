<template>
  <li
    class="bx--accordion__item"
    :class="{ 'bx--accordion__item--active': open }"
  >
    <button disabled type="button" class="bx--accordion__heading">
      <svg
        class="bx--accordion__arrow"
        width="8"
        height="12"
        viewBox="0 0 8 12"
        fill-rule="evenodd"
      >
        <path d="M0 10.6L4.7 6 0 1.4 1.4 0l6.1 6-6.1 6z"></path>
      </svg>
      <cv-skeleton-text class="bx--accordion__title"></cv-skeleton-text>
    </button>
    <div class="bx--accordion__content">
      <slot></slot>
    </div>
  </li>
</template>

<script>
import CvSkeletonText from '../cv-skeleton-text/cv-skeleton-text';

export default {
  name: 'CvAccordionItemSkeleton',
  components: {
    CvSkeletonText,
  },
  props: {
    open: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss"></style>
