<template>
  <component
    :is="tagType"
    v-on="$listeners"
    v-bind="linkProps"
    data-tile="clickable"
    :class="`cv-tile-clickable ${carbonPrefix}--tile--clickable`"
    tabindex="0"
  >
    <slot></slot>
  </component>
</template>

<script>
import LinkMixin from '../../mixins/link-mixin';
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';

export default {
  name: 'CvTileClickable',
  mixins: [LinkMixin, carbonPrefixMixin],
};
</script>
