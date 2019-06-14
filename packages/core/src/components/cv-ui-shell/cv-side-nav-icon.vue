<template>
  <div class="bx--side-nav__icon" :class="{ 'bx--side-nav__icon--small': small }">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CvSideNavIcon',
  props: {
    small: Boolean,
  },
};
</script>

<style lang="scss"></style>
