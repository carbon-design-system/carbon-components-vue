<template>
  <component
    :is="tagType"
    v-on="$listeners"
    v-bind="linkProps"
    data-tile="clickable"
    class="cv-tile-clickable bx--tile--clickable"
    tabindex="0"
  >
    <slot></slot>
  </component>
</template>

<script>
import LinkMixin from '../../mixins/link-mixin';

export default {
  name: 'CvTileClickable',
  mixins: [LinkMixin],
};
</script>
