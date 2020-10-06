<template>
  <div
    :class="[
      `${carbonPrefix}--structured-list`,
      {
        [`${carbonPrefix}--structured-list--selection`]: selectable,
        [`${carbonPrefix}--structured-list--condensed`]: condensed,
      },
    ]"
    :data-structured-list="selectable"
  >
    <div :class="`${carbonPrefix}--structured-list-thead`">
      <div :class="`${carbonPrefix}--structured-list-row ${carbonPrefix}--structured-list-row--header-row`">
        <slot name="headings"></slot>
        <div v-if="selectable" :class="`${carbonPrefix}--structured-list-th`"></div>
      </div>
    </div>
    <div :class="`${carbonPrefix}--structured-list-tbody`">
      <slot name="items"></slot>
    </div>
  </div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvStructuredList',
  mixins: [carbonPrefixMixin],
  props: {
    selectable: Boolean,
    condensed: Boolean,
  },
  mounted() {
    // pass on cv-structured-list-item change events
    this.$on('cv:change', val => this.$emit('change', val));
  },
};
</script>
