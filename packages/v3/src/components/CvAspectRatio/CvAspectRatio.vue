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
import { includesOrError } from '../../global/component-utils/validators';

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
      validator: includesOrError(aspectRatios, 'CvAspectRatio', 'ratio'),
    },
  },
  setup: () => ({ carbonPrefix }),
};
</script>
