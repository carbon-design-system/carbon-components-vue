<template>
  <cv-link-inner v-on="$listeners" data-tile="clickable" class="cv-tile-clickable bx--tile--clickable" tabindex="0">
    <slot></slot>
  </cv-link-inner>
</template>

<script>
import CvLinkInner from '../cv-link/_cv-link-inner';

export default {
  name: 'CvTileClickable',
  components: { CvLinkInner },
};
</script>
