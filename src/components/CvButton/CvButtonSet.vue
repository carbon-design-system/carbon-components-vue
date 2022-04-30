<template>
  <div
    :class="[
      `${carbonPrefix}--btn-set`,
      { [`${carbonPrefix}--btn-set--stacked`]: stacked },
    ]"
  >
    <!-- @slot Default content of button set, expects buttons -->
    <slot />
  </div>
</template>

<script>
import { carbonPrefix } from '../../global/settings';

export default {
  name: 'CvButtonSet',
  props: {
    /**
     * Button set stacked vertically
     */
    stacked: Boolean,
  },
  setup() {
    return {
      carbonPrefix,
    };
  },
};
</script>
