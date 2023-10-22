<template>
  <li
    ref="el"
    :class="[
      `cv-overflow-menu-item ${carbonPrefix}--overflow-menu-options__option`,
      {
        [`${carbonPrefix}--overflow-menu-options__option--disabled`]: disabled,
        [`${carbonPrefix}--overflow-menu-options__option--danger`]: danger,
      },
    ]"
    @keydown.esc.prevent="onEsc"
  >
    <button
      type="button"
      :class="`${carbonPrefix}--overflow-menu-options__btn`"
      :data-floating-menu-primary-focus="primaryFocus"
      :disabled="disabled"
      @click="onClick"
    >
      <span :class="`${carbonPrefix}--overflow-menu-options__option-content`">
        <slot></slot>
      </span>
    </button>
  </li>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { ref, useAttrs, inject } from 'vue';

defineProps({
  primaryFocus: Boolean,
  disabled: Boolean,
  danger: Boolean,
});
const el = ref(null);
const emitClick = inject('cv:click');
const emitClose = inject('cv:close');

const attrs = useAttrs();
function onClick() {
  emitClick(attrs.value);
}
function onEsc() {
  emitClose();
}
</script>
