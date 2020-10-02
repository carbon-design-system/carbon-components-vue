<template>
  <component
    :is="tagType"
    v-on="$listeners"
    v-bind="linkProps"
    :class="`cv-skip-to-content ${carbonPrefix}--skip-to-content`"
  >
    <slot>Skip to main content</slot>
  </component>
</template>

<script>
import { LinkMixin, carbonPrefixMixin } from '../../mixins';

export default {
  name: 'CvSkipToContent',
  mixins: [LinkMixin, carbonPrefixMixin],
};
</script>
