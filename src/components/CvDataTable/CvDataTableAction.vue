<template>
  <button
    ref="el"
    :class="`${carbonPrefix}--overflow-menu ${carbonPrefix}--toolbar-action`"
    v-bind="$attrs"
    type="button"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { onMounted, ref } from 'vue';

const el = ref(null);
onMounted(() => {
  // ensure SVG has the right class
  const first = el.value?.firstElementChild;
  first?.classList?.add(`${carbonPrefix}--toolbar-action__icon`);
});
</script>
