<template>
  <div
    class="cv-button-set"
    :class="[
      `${carbonPrefix}--btn-set`,
      { [`${carbonPrefix}--btn-set--stacked`]: stacked },
    ]"
  >
    <slot />
  </div>
</template>

<script>
import { carbonPrefix } from '../../global/settings';

export default {
  name: 'CvButtonSet',
  props: {
    stacked: Boolean,
  },
  setup() {
    return {
      carbonPrefix,
    };
  },
};
</script>
