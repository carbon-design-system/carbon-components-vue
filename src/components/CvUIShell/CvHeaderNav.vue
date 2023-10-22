<template>
  <nav :class="`cv-header-nav ${carbonPrefix}--header__nav`">
    <ul
      :class="`${carbonPrefix}--header__menu-bar`"
      role="menubar"
      :ariaLabeldBy="ariaLabelledBy"
    >
      <slot />
    </ul>
  </nav>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
defineProps({
  ariaLabelledBy: { type: String, default: undefined },
});
</script>
