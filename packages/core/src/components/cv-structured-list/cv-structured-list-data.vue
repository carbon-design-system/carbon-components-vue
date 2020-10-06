<template>
  <div
    :class="[
      `cv-structured-list-data ${carbonPrefix}--structured-list-td`,
      {
        [`${carbonPrefix}--structured-list-content--nowrap`]: noWrap,
      },
    ]"
  >
    <slot></slot>
  </div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvStructuredListData',
  mixins: [carbonPrefixMixin],
  props: {
    noWrap: Boolean,
  },
};
</script>
