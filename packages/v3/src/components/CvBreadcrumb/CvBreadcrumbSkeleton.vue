<template>
  <div :class="classes">
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
  setup(props) {
    const classes = {
      [`${carbonPrefix}--breadcrumb`]: true,
      [`${carbonPrefix}--skeleton`]: true,
      [`${carbonPrefix}--breadcrumb--no-trailing-slash`]: props.noTrailingSlash,
    };

    return { classes };
  },
};
</script>
