<template>
  <li :class="`cv-switcher-item ${carbonPrefix}--switcher__item`">
    <slot />
  </li>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvSwitcherItem',
  mixins: [carbonPrefixMixin],
};
</script>
