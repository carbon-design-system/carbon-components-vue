<template>
  <option
    :data-initial-selected="Boolean('selected' in $attrs) ? true : undefined"
    :class="`cv-select-option ${carbonPrefix}--select-option`"
  >
    <slot></slot>
  </option>
</template>

<script setup>
import { carbonPrefix } from '@/global/settings';
</script>
