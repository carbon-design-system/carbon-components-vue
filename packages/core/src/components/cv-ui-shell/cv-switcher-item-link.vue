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
import { linkMixin, carbonPrefixMixin } from '../../mixins';

export default {
  name: 'CvSwitcherItemLink',
  mixins: [linkMixin, carbonPrefixMixin],
  props: {
    selected: Boolean,
  },
};
</script>
