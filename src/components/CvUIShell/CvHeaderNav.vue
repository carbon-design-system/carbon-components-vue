<template>
  <nav :class="`cv-header-nav ${carbonPrefix}--header__nav`">
    <ul
      :class="`${carbonPrefix}--header__menu-bar`"
      role="menubar"
      aria-orientation="horizontal"
      :aria-label="ariaLabel || $attrs['aria-label']"
      :aria-labelledby="ariaLabelledBy || $attrs['aria-labelledby']"
    >
      <slot />
    </ul>
  </nav>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { carbonPrefix } from '../../global/settings';
defineProps({
  ariaLabel: { type: String, default: undefined },
  ariaLabelledBy: { type: String, default: undefined },
});
</script>
