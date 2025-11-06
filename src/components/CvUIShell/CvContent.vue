<script setup>
import { carbonPrefix } from '../../global/settings';
defineProps({
  tagType: { type: String, default: 'main' },
  id: { type: String, default: 'main-content' },
});
</script>

<template>
  <component
    :is="tagType"
    :id="id"
    :class="`${carbonPrefix}--content`"
    tabindex="-1"
  >
    <slot />
  </component>
</template>

<style scoped lang="scss"></style>
