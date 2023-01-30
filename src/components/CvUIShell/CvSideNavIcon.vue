<template>
  <div
    :class="[
      `${carbonPrefix}--side-nav__icon`,
      { [`${carbonPrefix}--side-nav__icon--small`]: small },
    ]"
  >
    <slot />
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
defineProps({
  small: Boolean,
});
</script>
