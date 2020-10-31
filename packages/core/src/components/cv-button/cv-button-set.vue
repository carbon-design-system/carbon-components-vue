<template>
  <div class="cv-button-set" :class="[`${carbonPrefix}--btn-set`, { [`${carbonPrefix}--btn-set--stacked`]: stacked }]">
    <slot />
  </div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';

export default {
  name: 'CvButtonSet',
  mixins: [carbonPrefixMixin],
  props: {
    stacked: Boolean,
  },
};
</script>
