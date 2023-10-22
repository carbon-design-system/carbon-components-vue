<template>
  <component
    :is="tagType"
    :checked="checkProp('checked', selected)"
    :expanded="checkProp('expanded', expanded)"
    :tile-collapsed-label="checkProp('tileCollapsedLabel', tileCollapsedLabel)"
    :tile-expanded-label="checkProp('tileCollapsedLabel', tileExpandedLabel)"
    :class="[
      `cv-tile ${carbonPrefix}--tile`,
      { [`${carbonPrefix}--tile--light`]: isLight },
    ]"
  >
    <template v-for="(_, name) in $slots" #[name]="slotData"
      ><slot :name="name" v-bind="slotData"
    /></template>
  </component>
</template>

<script setup>
import { computed } from 'vue';
import { carbonPrefix } from '../../global/settings';
import { props as propsTheme, useIsLight } from '../../use/cvTheme';
import CvTileStandard from './CvTileStandard.vue';
import CvTileClickable from './CvTileClickable.vue';
import CvTileSelectable from './CvTileSelectable.vue';
import CvTileExpandable from './CvTileExpandable.vue';

const props = defineProps({
  expanded: Boolean,
  selected: Boolean,
  tileCollapsedLabel: { type: String, default: 'Tile collapsed' },
  tileExpandedLabel: { type: String, default: 'Tile expanded' },
  kind: {
    type: String,
    default: '',
    validator: value =>
      ['clickable', 'expandable', 'selectable', 'standard', ''].includes(value),
  },
  ...propsTheme,
});

const tagType = computed(() => {
  switch (props.kind) {
    case 'clickable':
      return CvTileClickable;
    case 'selectable':
      return CvTileSelectable;
    case 'expandable':
      return CvTileExpandable;
    default:
      return CvTileStandard;
  }
});
const isLight = useIsLight(props);

/**
 * If the prop is defined on the tagType pass it along otherwise, discard it.
 * @param {string} prop
 * @param {any} value
 * @returns {*|undefined}
 */
function checkProp(prop, value) {
  return prop in (tagType.value.props || {}) ? value : undefined;
}
</script>

<style scoped></style>
