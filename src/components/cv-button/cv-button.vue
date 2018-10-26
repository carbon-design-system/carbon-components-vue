<template>
  <button :class="[
          'bx--btn',
          'bx--btn--' + kind.toLowerCase(),
          { 'bx--btn--sm': small },
          ]"
          v-on="$listeners"
          role="button"
          >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'CvButton',
  props: {
    kind: { type: String, default: 'primary' },
    small: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss">
// Import Style Definitions
@import '~carbon-components/scss/components/button/button';
</style>
