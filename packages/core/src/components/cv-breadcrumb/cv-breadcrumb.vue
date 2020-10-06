<template>
  <nav
    class="cv-breadcrumb"
    :class="[`${carbonPrefix}--breadcrumb`, { [`${carbonPrefix}--breadcrumb--no-trailing-slash`]: noTrailingSlash }]"
    :aria-label="ariaLabel"
  >
    <slot></slot>
  </nav>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvBreadcrumb',
  mixins: [carbonPrefixMixin],
  props: {
    ariaLabel: { type: String, default: 'breadcrumb' },
    noTrailingSlash: Boolean,
  },
};
</script>
