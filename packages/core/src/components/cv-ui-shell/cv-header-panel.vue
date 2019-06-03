<template>
  <div class="cv-header-panel bx--header-panel" :class="{ 'bx--header-panel--expanded': expanded }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CvHeaderPanel',
  props: {
    expanded: Boolean,
  },
};
</script>

<style lang="scss"></style>
