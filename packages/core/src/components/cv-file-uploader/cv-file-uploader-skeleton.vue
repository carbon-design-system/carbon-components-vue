<template>
  <div class="bx--form-item">
    <cv-skeleton-text heading width="100px" />
    <cv-skeleton-text width="225px" class="bx--label-description" />
    <cv-button-skeleton />
  </div>
</template>

<script>
import CvSkeletonText from '../cv-skeleton-text/cv-skeleton-text';
import CvButtonSkeleton from '../cv-button/cv-button-skeleton';

export default {
  name: 'CvFileUploaderSkeleton',
  components: {
    CvSkeletonText,
    CvButtonSkeleton,
  },
};
</script>
