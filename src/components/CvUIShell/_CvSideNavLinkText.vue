<template>
  <span :class="`${carbonPrefix}--side-nav__link-text`">
    <slot />
  </span>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
</script>
