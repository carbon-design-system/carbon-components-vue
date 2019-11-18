<template>
  <component :is="tagType" class="bx--content">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'CvContent',
  props: {
    tagType: { type: String, default: 'main' },
  },
};
</script>
