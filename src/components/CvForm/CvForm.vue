<template>
  <form :class="`cv-form ${carbonPrefix}--form`">
    <slot></slot>
  </form>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
</script>
