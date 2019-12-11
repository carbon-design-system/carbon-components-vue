<template>
  <div class="bx--side-nav__header-navigation" :class="{ 'bx--side-nav__header-divider': divider }"><slot /></div>
</template>

<script>
export default {
  name: 'CvHeaderSideNavItems',
  props: {
    divider: Boolean,
  },
};
</script>
