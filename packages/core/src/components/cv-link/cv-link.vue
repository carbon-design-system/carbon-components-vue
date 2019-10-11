<template>
  <component
    :is="tagType"
    v-on="$listeners"
    v-bind="linkProps"
    class="cv-link bx--link"
    :class="{ 'bx--link--inline': inline }"
  >
    <slot></slot>
  </component>
</template>

<script>
import LinkMixin from '../../mixins/link-mixin';

export default {
  name: 'CvLink',
  mixins: [LinkMixin],
  props: {
    inline: Boolean,
  },
};
</script>
