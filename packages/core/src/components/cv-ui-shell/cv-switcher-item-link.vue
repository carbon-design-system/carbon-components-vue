<template>
  <component
    :is="tagType"
    v-on="$listeners"
    v-bind="linkProps"
    :class="[
      `cv-switcher-item-link`,
      `${carbonPrefix}--switcher__item-link`,
      { [`${carbonPrefix}--switcher__item-link--selected`]: selected },
    ]"
  >
    <slot />
  </component>
</template>

<script>
import LinkMixin from '../../mixins/link-mixin';
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';

export default {
  name: 'CvSwitcherItemLink',
  mixins: [LinkMixin, carbonPrefixMixin],
  props: {
    selected: Boolean,
  },
};
</script>
