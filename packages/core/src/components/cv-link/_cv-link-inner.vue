<template>
  <component :is="tagType" v-on="$listeners">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'CvLinkInner',
  computed: {
    tagType() {
      // if to is used and not href then user wanted a router-link
      return this.$attrs.to && !this.$attrs.href ? 'router-link' : 'a';
    },
  },
};
</script>
