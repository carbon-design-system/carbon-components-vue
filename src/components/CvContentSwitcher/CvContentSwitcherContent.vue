<template>
  <div v-show="isVisible" class="cv-content-switcher-content">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import store from './cvContentSwitcherStore';

const props = defineProps({
  ownerId: { type: String, required: true },
  parentSwitcher: { type: String, default: 'global' },
});

const isVisible = computed(() => {
  return store.isOwnerContent(props.parentSwitcher, props.ownerId);
});
</script>

<style lang="scss"></style>
