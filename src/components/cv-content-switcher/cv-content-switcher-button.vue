<!--
  Carbon content switcher button.

  Attributes:
    content-selector: A CSS selector for the content to be shown when the button is selected.
    selected: If true the button is initially selected (only valid on one button per content switcher).

  Usage:
    See content-switcher.vue

-->

<template>
  <button
    class="cv-content-switcher-button"
    :class="[
      'bx--content-switcher-btn', {
        'bx--content-switcher--selected' : selected
      }]"
    :data-target="contentSelector"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'CvContentSwitcherButton',
  props: {
    contentSelector: String,
    selected: Boolean,
  },
};
</script>


<style lang="scss">
</style>
