<template>
  <li class="cv-overflow-menu__item bx--overflow-menu-options__option"
    :class="{
      'bx--overflow-menu-options__option--disabled': disabled,
      'bx--overflow-menu-options__option--danger': danger,
      }">
    <button
      class="bx--overflow-menu-options__btn"
      :data-floating-menu-primary-focus="primary"
      :disabled="disabled"
      >
      <slot></slot>
    </button>
  </li>
</template>

<script>
export default {
  name: 'CvOverflowMenuItem',
  props: {
    primary: Boolean,
    disabled: Boolean,
    danger: Boolean,
  },
};
</script>

<style lang="scss">
</style>
