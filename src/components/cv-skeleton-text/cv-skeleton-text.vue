<template>
  <p
    class="bx--skeleton__text"
    :class="{ 'bx--skeleton__heading': heading }"
    :style="{ width: width }"
  ></p>
</template>

<script>
export default {
  name: 'CvSkeletonText',
  props: {
    width: { type: String, default: '100%' },
    heading: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss"></style>
