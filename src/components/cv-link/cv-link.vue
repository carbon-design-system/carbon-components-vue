<template>
  <component :is="tagType" class="cv-link bx--link" v-on="$listeners">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'CvLink',
  computed: {
    tagType() {
      // if to is used and not href then user wanted a router-link
      return this.$attrs.to && !this.$attrs.href ? 'router-link' : 'a';
    },
  },
  beforeCreate() {
    console.warn(
      `${this.$options._componentTag}: review use/offer a router-link option? `
    );
  },
};
</script>

<style lang="scss"></style>
