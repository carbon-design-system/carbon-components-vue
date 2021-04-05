<template>
  <nav :aria-label="ariaLabel">
    <ol
      :class="[
        `${carbonPrefix}--breadcrumb`,
        { [`${carbonPrefix}--breadcrumb--no-trailing-slash`]: noTrailingSlash },
      ]"
    >
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
  setup: () => ({ carbonPrefix }),
};
</script>
