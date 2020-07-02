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
import LinkMixin from '../../mixins/link-mixin';
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';

export default {
  name: 'CvSkipToContent',
  mixins: [LinkMixin, carbonPrefixMixin],
};
</script>
