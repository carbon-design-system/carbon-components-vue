<template>
  <div :class="`cv-form-item ${carbonPrefix}--form-item`">
    <slot></slot>
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
</script>
