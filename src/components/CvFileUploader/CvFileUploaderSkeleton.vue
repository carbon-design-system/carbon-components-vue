<template>
  <div :class="`${carbonPrefix}--form-item`">
    <cv-skeleton-text heading width="100px" />
    <cv-skeleton-text
      width="225px"
      :class="`${carbonPrefix}--label-description`"
    />
    <cv-button-skeleton />
  </div>
</template>

<script setup>
import CvSkeletonText from '../CvSkeletonText';
import { CvButtonSkeleton } from '../CvButton';
import { carbonPrefix } from '../../global/settings';
</script>
