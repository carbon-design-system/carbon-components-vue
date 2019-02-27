<template>
  <div class="bx--form-item">
    <cv-skeleton-text heading width="100px" />
    <cv-skeleton-text width="225px" class="bx--label-descriptio" />
    <cv-button-skeleton />
  </div>
</template>

<script>
import TextSkeleton from '../cv-skeleton-text/cv-skeleton-text';
import ButtonSkeleton from '../cv-button/cv-button';

export default {
  name: 'CvFileUploaderSkeleton',
  components: {
    TextSkeleton,
    ButtonSkeleton,
  },
};
</script>

<style lang="scss"></style>
