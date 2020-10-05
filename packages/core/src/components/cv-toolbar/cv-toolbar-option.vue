<template>
  <li
    :class="`cv-toolbar-option ${carbonPrefix}--toolbar-menu__option`"
    @keydown.esc.prevent="$parent.$emit('cv:close')"
  >
    <slot></slot>
  </li>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvToolbarOption',
  mixins: [carbonPrefixMixin],
};
</script>
