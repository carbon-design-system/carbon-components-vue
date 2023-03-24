<template>
  <bx-clickable-tile
    :color-scheme="light ? 'light' : undefined"
    :disabled="disabled ? 'disabled' : undefined"
    ><slot>Clickable tile</slot></bx-clickable-tile
  >
</template>

<script setup>
import '@carbon/web-components/es/components/tile/index.js';
defineProps({
  light: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});
</script>
