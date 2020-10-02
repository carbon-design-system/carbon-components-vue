<template>
  <component
    :is="tagType"
    v-on="$listeners"
    v-bind="linkProps"
    class="cv-link"
    :class="[`${carbonPrefix}--link`, { [`${carbonPrefix}--link--inline`]: inline }]"
  >
    <slot></slot>
  </component>
</template>

<script>
import { LinkMixin, carbonPrefixMixin } from '../../mixins';

export default {
  name: 'CvLink',
  mixins: [LinkMixin, carbonPrefixMixin],
  props: {
    inline: Boolean,
  },
};
</script>
