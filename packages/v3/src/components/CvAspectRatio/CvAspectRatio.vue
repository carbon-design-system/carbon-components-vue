<template>
  <component
    :is="as"
    :class="[
      `${carbonPrefix}--aspect-ratio`,
      `${carbonPrefix}--aspect-ratio--${ratio}`,
    ]"
  >
    <slot />
  </component>
</template>

<script>
import { carbonPrefix } from '../../global/settings';
import { aspectRatios } from './consts';

export default {
  name: 'CvAspectRatio',
  props: {
    as: {
      type: String,
      default: 'div',
    },
    ratio: {
      type: String,
      default: aspectRatios[0],
      validator: value => aspectRatios.includes(value),
    },
  },
  setup: () => ({ carbonPrefix }),
};
</script>
