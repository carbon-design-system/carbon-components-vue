<template>
  <div
    :class="[
      `cv-content-switcher ${carbonPrefix}--content-switcher`,
      {
        [`${carbonPrefix}--content-switcher--light`]: isLight,
        [`${carbonPrefix}--content-switcher--${size || 'md'}`]: size || 'md',
      },
    ]"
    role="tablist"
    :id="cvId"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { props as propsCvId, useCvId } from '@/use/cvId';
import { useIsLight, props as propsTheme } from '../../use/cvTheme';
import { onUnmounted, watch } from 'vue';
import store from './cvContentSwitcherStore';

const emit = defineEmits(['selected']);

const props = defineProps({
  size: {
    type: String,
    default: undefined,
    validator: val => ['', 'md', 'sm', 'xl'].includes(val),
  },
  ...propsTheme,
  ...propsCvId,
});
const cvId = useCvId(props, true);
const isLight = useIsLight(props);
store.addParent(cvId.value);
store.setContentSelected('global', undefined);
onUnmounted(() => {
  store.removeParent(cvId.value);
});
watch(
  () => store.state.global.latest,
  (val, prev) => {
    // if previous is not set, do not emit. This mimics the current v2 behaviour where the initial content does not generate an event
    if (prev) emit('selected', val);
  }
);

let ourLatest = undefined;
watch(
  () => store.state[cvId.value],
  val => {
    if (ourLatest !== val?.latest) {
      // if ourLatest is not set, do not emit. This mimics the current v2 behaviour where the initial content does not generate an event
      if (ourLatest) emit('selected', val?.latest);
      ourLatest = val?.latest;
    }
  },
  { deep: true }
);
</script>

<style lang="scss"></style>
