<template>
  <ul :class="`cv-switcher ${carbonPrefix}--switcher__item`">
    <slot />
  </ul>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
</script>
