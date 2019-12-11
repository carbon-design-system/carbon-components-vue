<template>
  <component
    :is="tagType"
    class="cv-tile bx--tile"
    :class="{ 'bx--tile--light': theme === 'light' }"
    :checked="selected"
    :expanded="expanded"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <!-- can i now click on this -->
    <template>
      <slot></slot>
    </template>
    <template slot="below">
      <slot name="below"></slot>
    </template>
  </component>
</template>

<script>
import themeMixin from '../../mixins/theme-mixin';
import CvTileClickable from './_cv-tile-clickable';
import CvTileExpandable from './_cv-tile-expandable';
import CvTileSelectable from './_cv-tile-selectable';
import CvTileStandard from './_cv-tile-standard';

export default {
  name: 'CvTile',
  inheritAttrs: false,
  model: {
    // required for selectable kind
    prop: 'modelValue',
    event: 'modelEvent',
  },
  mixins: [themeMixin],
  components: {
    CvTileClickable,
    CvTileExpandable,
    CvTileSelectable,
    CvTileStandard,
  },
  props: {
    expanded: Boolean,
    selected: Boolean,
    kind: {
      type: String,
      default: '',
      validator: value => ['clickable', 'expandable', 'selectable', 'standard', ''].includes(value),
    },
  },
  computed: {
    tagType() {
      switch (this.kind) {
        case 'clickable':
          return 'cv-tile-clickable';
        case 'selectable':
          return 'cv-tile-selectable';
        case 'expandable':
          return 'cv-tile-expandable';
        default:
          return 'cv-tile-standard';
      }
    },
  },
};
</script>
