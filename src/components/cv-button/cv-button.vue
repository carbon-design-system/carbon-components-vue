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
    <svg v-if="iconHref" class="bx--btn__icon">
      <use :href="iconHref"></use>
    </svg>
  </button>
</template>

<script>
export default {
  name: 'CvButton',
  props: {
    iconHref: { type: String, default: null },
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

<style lang="scss"></style>
