<template>
  <div :class="[`${carbonPrefix}--side-nav__icon`, { [`${carbonPrefix}--side-nav__icon--small`]: small }]">
    <slot />
  </div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvSideNavIcon',
  mixins: [carbonPrefixMixin],
  props: {
    small: Boolean,
  },
};
</script>
