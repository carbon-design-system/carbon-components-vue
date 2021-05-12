<template>
  <li :class="`${carbonPrefix}--side-nav__divider`" />
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';

export default {
  name: 'CvSideNavMenuDivider',
  mixins: [carbonPrefixMixin],
};
</script>
