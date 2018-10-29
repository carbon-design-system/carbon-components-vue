<template>
  <div
    class="bx--structured-list-td"
    :class="{
      'bx--structured-list-content--nowrap': noWrap,
    }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CvStructuredListData',
  props: {
    noWrap: Boolean,
  },
};
</script>

<style lang="scss">
</style>
