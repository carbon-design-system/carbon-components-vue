<template>
  <cds-button-set :stacked="stacked || null">
    <!-- @slot Default content of button set, expects buttons -->
    <slot />
  </cds-button-set>
</template>

<script setup>
import '@carbon/web-components/es/components/button/index.js';

const props = defineProps({
  /** Button set stacked vertically */
  stacked: Boolean,
});
</script>
