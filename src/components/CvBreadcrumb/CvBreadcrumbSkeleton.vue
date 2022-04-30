<template>
  <div
    :class="[
      `${carbonPrefix}--breadcrumb`,
      `${carbonPrefix}--skeleton`,
      { [`${carbonPrefix}--breadcrumb--no-trailing-slash`]: noTrailingSlash },
    ]"
  >
    <slot />
  </div>
</template>

<script>
import { carbonPrefix } from '../../global/settings';

export default {
  name: 'CvBreadcrumbSkeleton',
  props: {
    /**
     * Stop trailing slash from being added
     */
    noTrailingSlash: {
      type: Boolean,
      default: false,
    },
  },
  setup: () => ({ carbonPrefix }),
};
</script>
