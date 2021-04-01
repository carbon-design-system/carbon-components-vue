<template>
  <nav :aria-label="ariaLabel">
    <ol :class="classes">
      <slot />
    </ol>
  </nav>
</template>

<script>
import { carbonPrefix } from '../../global/settings';

export default {
  name: 'CvBreadcrumb',
  props: {
    /**
     * A11y label
     */
    ariaLabel: {
      type: String,
      default: 'Breadcrumb',
    },
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
      [`${carbonPrefix}--breadcrumb--no-trailing-slash`]: props.noTrailingSlash,
    };

    return { classes };
  },
};
</script>
