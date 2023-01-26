<template>
  <li :class="`cv-switcher-item ${carbonPrefix}--switcher__item`">
    <slot />
  </li>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
</script>
