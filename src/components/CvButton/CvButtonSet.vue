<template>
  <cds-button-set v-bind="props">
    <!-- @slot Default content of button set, expects buttons -->
    <slot />
  </cds-button-set>
</template>

<script setup>
const props = defineProps({
  /** Button set stacked vertically */
  stacked: Boolean,
});
</script>
