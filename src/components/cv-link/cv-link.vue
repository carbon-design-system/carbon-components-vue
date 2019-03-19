<template>
  <component :is="tagType" class="cv-link bx--link" v-on="$listeners" v-bind="$attrs">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'CvLink',
  inheritAttrs: false,
  computed: {
    tagType() {
      // if to is used and not href then user wanted a router-link
      return this.$attrs.to && !this.$attrs.href ? 'router-link' : 'a';
    },
  },
};
</script>

<style lang="scss"></style>
