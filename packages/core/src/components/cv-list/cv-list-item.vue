<template>
  <li :class="`cv-list-item ${carbonPrefix}--list__item`">
    <slot></slot>
  </li>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvListItem',
  mixins: [carbonPrefixMixin],
};
</script>
