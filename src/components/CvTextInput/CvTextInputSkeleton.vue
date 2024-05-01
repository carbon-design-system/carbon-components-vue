<template>
  <cds-text-input-skeleton class="cv-text-input-skeleton" />
</template>

<script setup>
import '@carbon/web-components/es/components/text-input/text-input-skeleton';

defineProps({
  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: { type: Boolean, default: false },
});
</script>
<style lang="scss"></style>
