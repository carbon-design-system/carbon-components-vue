<template>
  <div
    :class="[`cv-tag ${carbonPrefix}--tag ${carbonPrefix}--skeleton`, { [`${carbonPrefix}--tag--${size}`]: size }]"
  ></div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvTagSkeleton',
  mixins: [carbonPrefixMixin],
  props: {
    size: {
      type: String,
      validator(val) {
        return !val || val == 'sm';
      },
    },
  },
};
</script>
