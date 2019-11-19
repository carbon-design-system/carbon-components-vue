<template>
  <li
    class="cv-overflow-menu-item bx--overflow-menu-options__option"
    :class="{
      'bx--overflow-menu-options__option--disabled': disabled,
      'bx--overflow-menu-options__option--danger': danger,
    }"
    @keydown.esc.prevent="onEsc"
  >
    <button
      type="button"
      class="bx--overflow-menu-options__btn"
      :data-floating-menu-primary-focus="primaryFocus"
      :disabled="disabled"
      v-on="$listeners"
      @click="onClick"
    >
      <span class="bx--overflow-menu-options__option-content">
        <slot></slot>
      </span>
    </button>
  </li>
</template>

<script>
export default {
  name: 'CvOverflowMenuItem',
  props: {
    primaryFocus: Boolean,
    disabled: Boolean,
    danger: Boolean,
  },
  methods: {
    onClick() {
      this.$parent.$emit('cv:click');
    },
    onEsc() {
      this.$parent.$emit('cv:close');
    },
  },
};
</script>
