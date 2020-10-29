<template>
  <div
    :class="[
      `cv-breadcrumb-item ${carbonPrefix}--breadcrumb-item`,
      { [`${carbonPrefix}--breadcrumb-item--current`]: activePage },
    ]"
    :aria-current="ariaCurrent"
  >
    <slot></slot>
  </div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvBreadcrumbItem',
  mixins: [carbonPrefixMixin],
  props: {
    active: Boolean,
    ariaCurrent: String,
  },
  computed: {
    activePage() {
      return this.active && this.ariaCurrent !== 'page';
    },
  },
};
</script>
