<template>
  <span :class="`${carbonPrefix}--side-nav__link-text`">
    <slot />
  </span>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvSideNavLinkText',
  mixins: [carbonPrefixMixin],
};
</script>
