<template>
  <cds-button-skeleton v-bind="props" />
</template>

<script setup>
import '@carbon/web-components/es/components/button/button-skeleton.js';
import { BUTTON_SIZE } from '@carbon/web-components/es/components/button/button';

const props = defineProps({
  /** Button size. */
  size: {
    type: String,
    default: undefined,
    /** @param {string} value */
    validator(value) {
      return Object.values(BUTTON_SIZE).includes(value);
    },
  },
});
</script>
