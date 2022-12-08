<template>
  <optgroup :class="`cv-select-optgroup ${carbonPrefix}--select-optgroup`">
    <slot></slot>
  </optgroup>
</template>

<script setup>
import { carbonPrefix } from '@/global/settings';
</script>
