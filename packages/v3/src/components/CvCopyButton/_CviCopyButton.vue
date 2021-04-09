<template>
  <button
    type="button"
    :class="[
      `${carbonPrefix}--copy`,
      {
        [`${carbonPrefix}--copy-btn--animating`]: isAnimating,
        [`${carbonPrefix}--copy-btn--${activeAnimation}`]: isAnimating,
      },
    ]"
    @click="handleClick"
    @animationend="handleAnimationEnd"
    aria-live="polite"
    :aria-label="feedback"
  >
    <slot />
    {{ feedback }}
    <span
      aria-hidden="true"
      :class="[
        `${carbonPrefix}--assistive-text`,
        `${carbonPrefix}--copy-btn__feedback`,
      ]"
      >{{ feedback }}</span
    >
  </button>
</template>

<script>
import { ref, computed } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { carbonPrefix } from '../../global/settings';

export default {
  props: {
    feedback: { type: String, required: true },
    feedbackTimeout: { type: Number, required: true },
  },
  emits: ['copy'],
  setup(props, { emit }) {
    const activeAnimation = ref('');
    const isAnimating = computed(() => activeAnimation.value.length > 0);

    const fadeOut = useDebounceFn(() => {
      activeAnimation.value = 'fade-out';
    }, props.feedbackTimeout);

    const handleClick = () => {
      emit('copy');
      activeAnimation.value = 'fade-in';
      fadeOut();
    };

    const handleAnimationEnd = event => {
      if (event.animationName !== 'hide-feedback') {
        return;
      }

      activeAnimation.value = '';
    };

    return {
      carbonPrefix,
      activeAnimation,
      isAnimating,
      handleClick,
      handleAnimationEnd,
    };
  },
};
</script>
