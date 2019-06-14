<template>
  <cv-link-inner class="cv-link bx--link" v-on="$listeners">
    <slot></slot>
  </cv-link-inner>
</template>

<script>
import CvLinkInner from './_cv-link-inner';

export default {
  name: 'CvLink',
  components: { CvLinkInner },
};
</script>
