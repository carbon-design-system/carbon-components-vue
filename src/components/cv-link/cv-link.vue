<template>
  <a class="cv-link bx--link" v-on="$listeners">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: 'CvLink',
};
</script>

<style lang="scss">
@import '~carbon-components/scss/components/link/link';
</style>
