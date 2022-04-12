<template>
  <component
    :is="tagType"
    v-on="$listeners"
    v-bind="linkProps"
    class="cv-link"
    :class="[
      `${carbonPrefix}--link`,
      {
        [`${carbonPrefix}--link--disabled`]: disabled,
        [`${carbonPrefix}--link--inline`]: inline,
      },
    ]"
  >
    <slot></slot>
  </component>
</template>

<script>
import { linkMixin, carbonPrefixMixin } from '../../mixins';

export default {
  name: 'CvLink',
  mixins: [linkMixin, carbonPrefixMixin],
  props: {
    disabled: Boolean,
    inline: Boolean,
  },
};
</script>
