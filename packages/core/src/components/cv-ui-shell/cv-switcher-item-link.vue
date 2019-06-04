<template>
  <a class="cv-switcher-item-link bx--switcher__item-link" :class="{ 'bx--switcher__item-link--selected': selected }">
    <slot />
  </a>
</template>

<script>
export default {
  name: 'CvSwitcherItemLink',
  props: {
    selected: Boolean,
  },
};
</script>

<style lang="scss"></style>
