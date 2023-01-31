<template>
  <div class="cv-grid-story">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="scss">
@import '@carbon/grid/scss/modules/css-grid';
.cv-grid-story {
  width: 100%;
}
.cv-grid-story .cv-column {
  background-color: #d0e2ff; /* blue-20 */
  outline: 1px dashed #78a9ff; /* blue-40 */
}
.cv-column div {
  background-color: #edf5ff; /* blue-10 */
  min-height: 100px;
  height: 100%;
}
</style>
