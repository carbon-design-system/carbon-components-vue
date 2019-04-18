<template>
  <div
    class="cv-structured-list-data bx--structured-list-td"
    :class="{
      'bx--structured-list-content--nowrap': noWrap,
    }"
  >
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
