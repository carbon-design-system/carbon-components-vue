<template>
  <div
    :class="`cv-structured-list-item--standard ${carbonPrefix}--structured-list-row`"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
</script>
