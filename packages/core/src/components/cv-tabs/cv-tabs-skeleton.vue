<template>
  <div :class="`cv-tabs ${carbonPrefix}--tabs ${carbonPrefix}--skeleton ${carbonPrefix}--tabs--scrollable`">
    <ul :class="`${carbonPrefix}--tabs--scrollable__nav`">
      <li v-for="index in tabCount" :key="index" :class="`${carbonPrefix}--tabs--scrollable__nav-item`">
        <div :class="`${carbonPrefix}--tabs__nav-link`"><span></span></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvTabsSkeleton',
  mixins: [carbonPrefixMixin],
  props: {
    tabCount: { type: Number, default: 5 },
  },
};
</script>
