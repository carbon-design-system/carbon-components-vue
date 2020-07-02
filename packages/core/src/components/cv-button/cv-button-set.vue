<template>
  <div class="cv-button-set" :class="`${carbonPrefix}--btn-set`">
    <slot />
  </div>
</template>

<script>
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';

export default {
  name: 'CvButtonSet',
  mixins: [carbonPrefixMixin],
};
</script>
