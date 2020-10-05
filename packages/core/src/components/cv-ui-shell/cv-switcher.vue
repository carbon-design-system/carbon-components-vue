<template>
  <ul :class="`cv-switcher ${carbonPrefix}--switcher__item`">
    <slot />
  </ul>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvSwitcher',
  mixins: [carbonPrefixMixin],
};
</script>
