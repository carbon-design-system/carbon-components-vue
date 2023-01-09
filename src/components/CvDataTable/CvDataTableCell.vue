<template>
  <td :style="cellStyle">
    <slot />
  </td>
</template>

<script setup>
defineProps({
  cellStyle: { type: Object, default: () => new Object() },
});
</script>
