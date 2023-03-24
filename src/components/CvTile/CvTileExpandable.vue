<template>
  <bx-expandable-tile>
    <bx-tile-above-the-fold-content slot="above-the-fold-content">
      <slot>
        <!-- Above the fold content here -->
      </slot>
    </bx-tile-above-the-fold-content>
    <bx-tile-below-the-fold-content>
      <slot name="below"> Below the fold content here </slot>
    </bx-tile-below-the-fold-content>
  </bx-expandable-tile>
</template>

<script setup>
import '@carbon/web-components/es/components/tile/index.js';

defineProps({
  expanded: Boolean,
  tileCollapsedLabel: String,
  tileExpandedLabel: String,
});
</script>
