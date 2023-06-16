<template>
  <div
    disabled
    :class="[
      `${carbonPrefix}--list-box ${carbonPrefix}--dropdown ${carbonPrefix}--skeleton`,
      { [`${carbonPrefix}--list-box--inline`]: inline },
    ]"
  ></div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';

defineProps({
  inline: { type: Boolean, default: false },
});
</script>
