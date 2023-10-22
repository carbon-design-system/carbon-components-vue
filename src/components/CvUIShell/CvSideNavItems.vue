<template>
  <ul
    ref="el"
    :class="`cv-side-nav-items ${carbonPrefix}--side-nav__items`"
    @mousedown="onMousedown"
  >
    <slot />
  </ul>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { ref } from 'vue';

const el = ref(null);
function onMousedown(ev) {
  if (ev.target === el.value) {
    // non-css fix for #448
    ev.preventDefault();
  }
}
</script>
