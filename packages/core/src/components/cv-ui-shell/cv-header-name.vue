<template>
  <cv-link-inner v-on="$listeners" class="cv-header-name bx--header__name">
    <span v-if="prefix" class="bx--header__name--prefix">{{ prefix }}</span>
    &nbsp;
    <slot />
  </cv-link-inner>
</template>

<script>
import CvLinkInner from '../cv-link/_cv-link-inner';

export default {
  name: 'CvHeaderName',
  components: { CvLinkInner },
  props: {
    prefix: String,
  },
};
</script>
