<script setup>
import { carbonPrefix } from '../../global/settings';
defineProps({
  tagType: { type: String, default: 'main' },
});
</script>

<template>
  <component :is="tagType" :class="`${carbonPrefix}--content`">
    <slot />
  </component>
</template>

<style scoped lang="scss"></style>
