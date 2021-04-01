<template>
  <li :class="classes">
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
  setup(props) {
    const classes = {
      [`${carbonPrefix}--breadcrumb-item`]: true,
      [`${carbonPrefix}--breadcrumb-item--current`]: props.isCurrentPage,
    };

    return { classes };
  },
};
</script>
