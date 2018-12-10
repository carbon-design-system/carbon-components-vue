<template>
  <a class="cv-link bx--link" v-on="$listeners">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: 'CvLink',
  beforeCreate() {
    console.warn(
      `${this.$options._componentTag}: review use/offer a router-link option? `
    );
  },
};
</script>

<style lang="scss">
</style>
