<template>
  <div :class="`cv-tabs ${carbonPrefix}--tabs ${carbonPrefix}--skeleton`">
    <div :class="`${carbonPrefix}--tabs-trigger`">
      <div :class="`${carbonPrefix}--tabs-trigger-text`">&nbsp;</div>
      <svg width="10" height="5" viewBox="0 0 10 5" fill-rule="evenodd">
        <path d="M10 0L5 5 0 0z" />
      </svg>
    </div>
    <ul :class="`${carbonPrefix}--tabs__nav ${carbonPrefix}--tabs__nav--hidden`">
      <li :class="`cv-tab ${carbonPrefix}--tabs__nav-item ${carbonPrefix}--tabs__nav-item--selected`">
        <div :class="`${carbonPrefix}--tabs__nav-link`">&nbsp;</div>
      </li>
      <li :class="`cv-tab ${carbonPrefix}--tabs__nav-item`">
        <div :class="`${carbonPrefix}--tabs__nav-link`">&nbsp;</div>
      </li>
      <li :class="`cv-tab ${carbonPrefix}--tabs__nav-item`">
        <div :class="`${carbonPrefix}--tabs__nav-link`">&nbsp;</div>
      </li>
      <li :class="`cv-tab ${carbonPrefix}--tabs__nav-item`">
        <div :class="`${carbonPrefix}--tabs__nav-link`">&nbsp;</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvTabsSkeleton',
  mixins: [carbonPrefixMixin],
};
</script>
