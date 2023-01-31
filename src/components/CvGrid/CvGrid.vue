<template>
  <div
    class="cv-grid"
    :class="[
      `${carbonPrefix}--grid`,
      {
        [`${carbonPrefix}--grid--full-width`]: fullWidth,
        [`${carbonPrefix}--grid--condensed`]: kind === 'condensed',
        [`${carbonPrefix}--grid--narrow`]: kind === 'narrow',
      },
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';

defineProps({
  /**
   * Remove the default max width that the grid has set
   */
  fullWidth: Boolean,
  /**
   * - wide - default
   * - condensed - Collapse the gutter to 1px. Useful for fluid layouts. Rows have 1px of margin between them to match gutter.
   * - narrow - Container hangs 16px into the gutter. Useful for typographic alignment with and without containers.
   */
  kind: {
    type: String,
    default: 'wide',
    validator: val => ['wide', 'narrow', 'condensed'].includes(val),
  },
});
</script>
