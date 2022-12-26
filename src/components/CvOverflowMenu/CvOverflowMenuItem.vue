<template>
  <li
    :class="[
      `cv-overflow-menu-item ${carbonPrefix}--overflow-menu-options__option`,
      {
        [`${carbonPrefix}--overflow-menu-options__option--disabled`]: disabled,
        [`${carbonPrefix}--overflow-menu-options__option--danger`]: danger,
      },
    ]"
    @keydown.esc.prevent="onEsc"
    ref="el"
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
import { onMounted, ref, useAttrs } from 'vue';
import { getBus } from '@/global/component-utils/event-bus';

defineProps({
  primaryFocus: Boolean,
  disabled: Boolean,
  danger: Boolean,
});
let bus = undefined;
const el = ref(null);
onMounted(() => {
  const pe = el.value.closest('[data-overflow-menu]');
  const parent = pe?.getAttribute('id');
  if (parent) bus = getBus(parent);
  else console.warn('overflow menu not found');
});
const attrs = useAttrs();
function onClick() {
  bus?.emit('cv:click', attrs.value);
}
function onEsc() {
  bus?.emit('cv:close');
}
</script>
