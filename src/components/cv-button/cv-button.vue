<template>
  <button
    class="cv-button"
    :class="[
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
    kind: {
      type: String,
      default: 'primary',
      validator: val =>
        [
          'primary',
          'secondary',
          'tertiary',
          'ghost',
          'danger',
          'danger--primary',
        ].includes(val),
    },
    small: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss">
</style>
