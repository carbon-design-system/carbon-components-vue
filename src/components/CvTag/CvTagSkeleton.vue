<template>
  <CvTag skeleton :small="small" :label="''" />
</template>

<script>
import CvTag from './CvTag.vue';

export default {
  name: 'CvTagSkeleton',
  components: { CvTag },
  props: {
    /**
     * tag size small
     */
    small: {
      type: Boolean,
    },
  },
};
</script>
