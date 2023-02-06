<template>
  <div class="sb-grid-container">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style>
.sb-grid-container {
  width: 100%;
}
.sb-grid-container .cv-column {
  background-color: #d0e2ff; /* blue-20 */
  outline: 1px dashed #78a9ff; /* blue-40 */
}
.sb-grid-container .cv-column div {
  background-color: #edf5ff; /* blue-10 */
  min-height: 100px;
  height: 100%;
}
</style>
