<template>
  <cv-link-inner v-on="$listeners" class="cv-skip-to-content bx--skip-to-content">
    <slot>Skip to main content</slot>
  </cv-link-inner>
</template>

<script>
import CvLinkInner from '../cv-link/_cv-link-inner';

export default {
  name: 'CvSkipToContent',
  components: { CvLinkInner },
};
</script>
