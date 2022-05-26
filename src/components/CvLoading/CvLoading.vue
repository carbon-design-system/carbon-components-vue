<template>
  <div
    v-if="overlay"
    class="cv-loading"
    :class="overlayClasses"
    id="overlayDiv"
  />
  <teleport :disabled="!overlay" to="body">
    <div
      data-loading
      :class="{
        'cv-loading': !overlay,
        [`${carbonPrefix}--loading`]: active || stopping,
        [`${carbonPrefix}--loading--stop`]: (!active && stopping) || stopped,
        [`${carbonPrefix}--loading--small`]: small,
      }"
      ref="loading"
      aria-atomic="true"
      :aria-labelledby="cvId"
      aria-live="assertive"
    >
      <label :id="cvId" :class="`${carbonPrefix}--visually-hidden`">
        {{ description }}
      </label>
      <svg :class="`${carbonPrefix}--loading__svg`" viewBox="0 0 100 100">
        <title>{{ description }}</title>
        <circle
          v-if="small"
          :class="`${carbonPrefix}--loading__background`"
          cx="50%"
          cy="50%"
          :r="loadingRadius"
        />
        <circle
          :class="`${carbonPrefix}--loading__stroke`"
          cx="50%"
          cy="50%"
          :r="loadingRadius"
        />
      </svg>
    </div>
  </teleport>
</template>

<script setup>
import { ref, computed, watch, toRef } from 'vue';
import { carbonPrefix } from '@/global/settings';
import { useCvId, props as propsCvId } from '../../use/cvId';

const props = defineProps({
  active: { type: Boolean, default: true },
  description: { type: String, default: 'Loading' },
  overlay: { type: Boolean },
  small: { type: Boolean },
  ...propsCvId,
});
const cvId = useCvId(props);

let stopping = ref(false);
let stopped = ref(false);
const overlayClasses = computed(() => {
  const classes = [];
  if (props.overlay) {
    if (props.active || stopping) {
      classes.push(`${carbonPrefix}--loading-overlay`);
    } else {
      classes.push(`${carbonPrefix}--loading-overlay--stop`);
    }
  }

  return classes;
});

const loadingRadius = computed(() => {
  return props.small ? '42' : '44';
});

// Maintain the active state
const loading = ref(null);
const emit = defineEmits(['loading-end']);
function onEnd(ev) {
  if (ev.animationName === 'rotate-end-p2') {
    loading.value.removeEventListener('animationend', onEnd);

    stopping.value = false;
    stopped.value = true;

    emit('loading-end');
  }
}
function onActiveUpdate(newValue) {
  stopped.value = false;
  stopping.value = !newValue;
  if (!newValue) {
    loading.value.addEventListener('animationend', onEnd);
  }
}
watch(
  () => props.active,
  val => {
    onActiveUpdate(val);
  }
);
</script>
