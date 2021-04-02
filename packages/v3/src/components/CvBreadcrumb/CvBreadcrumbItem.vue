<template>
  <li
    :class="[
      `${carbonPrefix}--breadcrumb-item`,
      { [`${carbonPrefix}--breadcrumb-item--current`]: isCurrentPage },
    ]"
  >
    <slot />
  </li>
</template>

<script>
import { carbonPrefix } from '../../global/settings';

export default {
  name: 'CvBreadcrumbItem',
  props: {
    /**
     * Is this item the current page?
     */
    isCurrentPage: {
      type: Boolean,
      default: false,
    },
  },
  setup: () => ({ carbonPrefix }),
};
</script>
